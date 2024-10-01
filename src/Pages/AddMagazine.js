import React, { useContext, useEffect, useState } from 'react'
import "./AddNews.css"
import NewsContext from '../Context/News/NewsContext';
import "./AddMagazine.css"
import { useNavigate } from 'react-router-dom';

const AddMagazine = ({ showAlert, showProfile, showAddMenu }) => {

    const navigate = useNavigate();

    const { addMagazine } = useContext(NewsContext);
    const [title, setTitle] = useState("");
    const [images, setImages] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(title, images, body);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("coverImageURL", images)

        showAlert("Added Magazine Successfully!", "success");
        addMagazine(formData);

        navigate("/magazine")

    }

    const postImage = async (image) => {

        const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/avif"];

        if (validImageTypes.includes(image.type)) {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "newsImages");
            data.append("cloud_name", "dpkaxrntd");

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dpkaxrntd/image/upload", {
                    method: "post",
                    body: data,
                })

                if (response.ok) {
                    const json = await response.json();

                    if (json.url) {
                        setImages(json.url);
                    }

                    else {
                        console.log(json.Error);
                    }
                }

                else {
                    console.log(`Error fetching news: ${response.status} ${response.statusText}`)
                }

            } catch (error) {
                console.error("Error fetching the news:", error);
            }
        }
    }

    // Title change
    useEffect(() => {
        document.title = "INDUSTRIAL TIMES - Add Magazine";  // Set the document title to the news title
    }, []);


    return (
        <div className={`addMagazine ${showProfile ? "userMenu" : ""}${showAddMenu ? "showMenu" : ""}`}>
            <div className="addMagazineInner">
                <h1>Add Magazine</h1>

                <div className="addMagazineForm">
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="image">Cover Image(JPEG/JPG/PNG)</label>
                        <input type="file" name='image' id='image' required onChange={(e) => postImage(e.target.files[0])} />
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='title' required onChange={(e) => setTitle(e.target.value)} minLength={3} />
                        <label htmlFor="title">Upload Magazine</label>
                        <input type="file" accept='application/pdf' onChange={(e) => setBody(e.target.files[0])} required />
                        <input className='submitBtn' disabled={images.length === 0} type="submit" value={images.length === 0 ? "Upload Image" : "Post"} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMagazine
