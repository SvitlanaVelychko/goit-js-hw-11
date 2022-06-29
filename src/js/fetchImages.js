import axios from "axios";

const DEFAULT_PAGE = 1;
let page = DEFAULT_PAGE;

export const resetPage = () => {
    page = DEFAULT_PAGE;
};

export const fetchImages = imageName => {
    const searchParams = new URLSearchParams({
        key: '28337578-4a6faed3a9785284bd8e8ad21',
        q: imageName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
    });
    
    return axios.get(`https://pixabay.com/api/?${searchParams}`)
        .then(res => res.data)
        .then(data => {
            page += 1;
            const images = data.hits;
            return images;
        });
};