#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use directories::UserDirs;
use std::fs;
use tauri::Manager;

fn main() {
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
        .invoke_handler(tauri::generate_handler![get_settings, write_settings])
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
