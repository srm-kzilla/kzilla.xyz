use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use crate::database::schema::links::Link;
use crate::database::schema::users::User;

#[derive(Clone)]
pub struct UserCache {
    pub cache: Arc<Mutex<HashMap<i32, User>>>,
    pub ttl: u64,
}

#[derive(Clone)]
pub struct UserLinksCache {
    pub cache: Arc<Mutex<HashMap<i32, Vec<Link>>>>,
    pub ttl: u64,
}

impl UserCache {
    pub fn new(ttl: u64) -> Self {
        Self {
            cache: Arc::new(Mutex::new(HashMap::new())),
            ttl,
        }
    }

    pub fn get(&self, key: &i32) -> Option<User> {
        self.cache.lock().unwrap().get(key).cloned()
    }

    pub fn set(&self, key: i32, value: User) {
        self.cache.lock().unwrap().insert(key, value);
    }

    pub fn clear_expired(&mut self) {
        let mut cache = self.cache.lock().unwrap();
        let now = chrono::Utc::now().timestamp() as u64;

        cache.retain(|_, v| {
            let created_at = v.created_at.timestamp() as u64;
            now - created_at < self.ttl
        });
    }
}

impl UserLinksCache {
    pub fn new(ttl: u64) -> Self {
        Self {
            cache: Arc::new(Mutex::new(HashMap::new())),
            ttl,
        }
    }

    pub fn get(&self, key: &i32) -> Option<Vec<Link>> {
        self.cache.lock().unwrap().get(key).cloned()
    }

    pub fn set(&self, key: i32, value: Vec<Link>) {
        self.cache.lock().unwrap().insert(key, value);
    }

    pub fn clear_expired(&mut self) {
        let mut cache = self.cache.lock().unwrap();
        let now = chrono::Utc::now().timestamp() as u64;

        cache.retain(|_, v| {
            let created_at = v.first().unwrap().created_at.timestamp() as u64;
            now - created_at < self.ttl
        });
    }
}