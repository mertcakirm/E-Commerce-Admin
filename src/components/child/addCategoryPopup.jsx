import {useState} from 'react';
import {addCategory} from "../../pages/api/kategoriapi.js";

const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
const AddCategoryPopup = ({popupCloser,reloadPageCat}) => {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryType, setNewCategoryType] = useState("");
    const [newCategoryImage, setNewCategoryImage] = useState(null);


    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "image") {
            setNewCategoryImage(files ? files[0] : null);
        } else if (name === "name") {
            setNewCategoryName(value);
        } else if (name === "type") {
            setNewCategoryType(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const base64Image = await convertImageToBase64(newCategoryImage);
        const base64new = base64Image.split(",")[1];

        const categoryDTO = {
            image: { "bytes": base64new },
            typeName: newCategoryType,
            categoryName: newCategoryName,
        };

        try {
            await addCategory(categoryDTO);
            popupCloser(false);
            reloadPageCat(true);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    // if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content" style={{width:"500px"}}>
                <div className='popup-header'>
                    <h2>Kategori Ekle</h2>

                    <button className="popup-close-btn" onClick={()=>popupCloser(false)}>&times;</button>
                </div>
                <div className='row row-gap-5 justify-content-around column-gap-3 mt-5'>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Kategori Adı"
                            className="col-5 popup-inp"
                            style={{height:'40px'}}
                            value={newCategoryName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            id="type"
                            className="col-5 popup-inp"
                            style={{height:'40px'}}
                            placeholder="Kategori Türü"
                            name="type"
                            value={newCategoryType}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="file"
                            className="col-12 "
                            id="image"
                            name="image"
                            onChange={handleChange}
                        />
                        <button  onClick={handleSubmit} className="tumunu-gor-btn-admin col-12">Ekle</button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryPopup;
