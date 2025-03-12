pub fn generate_random_code(length: usize) -> String {
    let mut result = String::new();
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let characters_length = characters.chars().count();
    for _ in 0..length {
        let random_index = rand::random::<usize>() % characters_length;
        result.push(characters.chars().nth(random_index).unwrap());
    }
    result
}