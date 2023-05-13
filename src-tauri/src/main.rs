#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use directories::UserDirs;
use serde::Serialize;
use std::{fs, sync::Mutex};
use tauri::Manager;
use winit::event_loop::EventLoop;

#[derive(Serialize, Clone)]
struct VideoMode {
    width: u32,
    height: u32,
    refresh_rate: u32,
}

type VideoModes = Vec<VideoMode>;

struct AvailableVideoModes(Mutex<VideoModes>);

fn main() {
    let mut video_modes = VideoModes::new();
    let event_loop = EventLoop::new();
    let monitor = match event_loop.primary_monitor() {
        Some(monitor) => monitor,
        None => {
            println!("No primary monitor detected.");
            return;
        }
    };

    for mode in monitor.video_modes() {
        if video_modes.iter().any(|m| {
            m.width == mode.size().width
                && m.height == mode.size().height
                && m.refresh_rate == mode.refresh_rate_millihertz() / 1000
        }) {
            continue;
        }

        video_modes.push(VideoMode {
            width: mode.size().width,
            height: mode.size().height,
            refresh_rate: mode.refresh_rate_millihertz() / 1000,
        });
    }

    video_modes.sort_by(|a, b| {
        if a.width == b.width {
            if a.height == b.height {
                a.refresh_rate.cmp(&b.refresh_rate)
            } else {
                a.height.cmp(&b.height)
            }
        } else {
            a.width.cmp(&b.width)
        }
    });

    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .manage(AvailableVideoModes(Mutex::new(video_modes)))
        .invoke_handler(tauri::generate_handler![
            get_settings,
            write_settings,
            get_video_modes
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_settings() -> String {
    let user_dirs = UserDirs::new().expect("User directories not found");
    let docuemnts_dir = user_dirs
        .document_dir()
        .expect("Documents directory not found");
    let settings_dir = docuemnts_dir.join("Overwatch/Settings");
    let settings_file = settings_dir.join("Settings_v0.ini");

    // Create the settings directory if it doesn't exist
    fs::create_dir_all(&settings_dir).expect("Failed to create settings directory");

    // Create the settings file if it doesn't exist
    if !settings_file.exists() {
        fs::File::create(&settings_file).expect("Failed to create settings file");
    }

    // Read the settings file
    let settings = fs::read_to_string(&settings_file).expect("Failed to read settings file");

    settings
}

#[tauri::command]
fn write_settings(settings: String) {
    let user_dirs = UserDirs::new().expect("User directories not found");
    let docuemnts_dir = user_dirs
        .document_dir()
        .expect("Documents directory not found");
    let settings_dir = docuemnts_dir.join("Overwatch/Settings");
    let settings_file = settings_dir.join("Settings_v0.ini");

    // Create the settings directory if it doesn't exist
    fs::create_dir_all(&settings_dir).expect("Failed to create settings directory");

    // Create the settings file if it doesn't exist
    if !settings_file.exists() {
        fs::File::create(&settings_file).expect("Failed to create settings file");
    }

    // Write the settings file
    fs::write(&settings_file, settings).expect("Failed to write settings file");
}

#[tauri::command]
fn get_video_modes(state: tauri::State<AvailableVideoModes>) -> Vec<VideoMode> {
    state.0.lock().unwrap().clone()
}
