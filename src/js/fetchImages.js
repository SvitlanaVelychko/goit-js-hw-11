//import axios from "axios";

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
    
    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(res.statusText);
        })
        .then(data => {
            page += 1;
            return {
                images: data.hits,
                totalHits: data.totalHits,
            };
        });
};