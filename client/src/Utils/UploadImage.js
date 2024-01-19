export const ImageUplaod = async (image) => {
        
    let result;
    try {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'wyzazr5b');
        data.append('cloud_name', 'duextvtta');

        const res = await fetch("https://api.cloudinary.com/v1_1/duextvtta/image/upload", { method: 'post', body: data });
        result = await res.json();
    } catch (err) { console.error('Error uploading image:', err) }

    return result?.url;
};
