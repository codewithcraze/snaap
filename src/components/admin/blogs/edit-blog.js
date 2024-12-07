import { useState, useEffect } from 'react';
import '../../../styles/main.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { showToast, Loader } from '../../../utils/tool.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from "react-router-dom";
import { UPDATEBLOG, GETBLOG } from '../../../credentials/index.js';


export default function ViewSpecificBlog() {

    // const [editorInstance, setEditorInstance] = React.useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        titleUrl: '',
        content: '',
        description: '',
        categoryName: '',
        tfnHeader: '',
        tfnPopup: '',
        tfnFooter: '',
        postBy: '',
        imageURL: null,
        extraTags: '',
        heading: '',
        status: Boolean,
        id: "",
        metaDescription: '',
        metaKeywords: '',
    });
    const [editorInstance, setEditorInstance] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    console.log(formData);

    const uploadImage = async () => {

        if (!imageFile) return '';

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axios.post("https://openurl-seven.vercel.app/upload", formData);
            if (response.data) {
                return response.data.imageUrl;
            }
        } catch (error) {
            console.error('Error uploading image:', error.response?.data);
            showToast("ERROR", error.response?.data?.message || 'Image upload failed');
        }
        return '';
    };

    useEffect(() => {
        const apiUrl = `${GETBLOG}/${id}`;
        const fetchBlogData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch blog data");
                }
                const data = await response.json();
                console.log(data);
                if (data) {
                    setFormData({
                        title: data.blog.title || '',
                        titleUrl: data.blog.titleUrl || '',
                        content: data.blog.content || '',
                        description: data.blog.description || '',
                        categoryName: data.blog.categoryName || '',
                        tfnHeader: data.blog.tfnHeader || '',
                        tfnPopup: data.blog.tfnPopup || '',
                        tfnFooter: data.blog.tfnFooter || '',
                        postBy: data.blog.postBy || '',
                        extraTags: data.blog.extraTags || '',
                        heading: data.blog.heading || '',
                        status: data.blog.status || '',
                        imageURL: data.blog.imageURL,
                        id: data.blog._id || '',
                        metaDescription: data.blog.metaDescription || '',
                        metaKeywords: data.blog.metaKeywords || '',
                    });
                    if (editorInstance) {
                        editorInstance.setData(data.data.content || '');
                    }
                }
            } catch (err) {

            } finally {

            }
        };
        fetchBlogData();
    }, [editorInstance]);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setImageFile(files[0]);
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {

            const imageUrl = await uploadImage();

            const requestBody = {
                title: formData.title || '',
                titleUrl: formData.titleUrl || '',
                content: formData.content || '',
                description: formData.description || '',
                categoryName: formData.categoryName || '',
                tfnHeader: formData.tfnHeader || '',
                tfnPopup: formData.tfnPopup || '',
                tfnFooter: formData.tfnFooter || '',
                imgUrl: imageUrl || formData.imageURL   ,
                postBy: formData.postBy || '',
                extraTags: formData.extraTags || '',
                heading: formData.heading || '',
                status: formData.status || '',
                metaDescription: formData.metaDescription || '',
                metaKeywords: formData.metaKeywords || '',
            };

            if (editorInstance) {
                editorInstance.setData(''); // Clear CKEditor content
            }

            const response = await axios.patch(`${UPDATEBLOG}/${id}`, requestBody);

            if (response.data.status) {
                setLoading(false);
                showToast("SUCCESS", response.data.msg || 'Update successful');
            } else {
                setLoading(false);
                showToast("ERROR", response.data.msg || 'Update successful');
            }
        } catch (error) {
            console.error('Error updating agent:', error.response?.data);
            showToast("ERROR", error.response?.data?.msg || 'Update failed');
            setLoading(false);
        }
    };


    const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            const formDataToSend = new FormData();
            formDataToSend.append('image', file);

            axios.post(`https://openurl-seven.vercel.app/upload`, formDataToSend)
                .then(response => {
                    resolve({ default: response.data.imageUrl });
                })
                .catch(error => {
                    console.error('Upload failed:', error);
                    reject('Upload failed.');
                });
        });
    };


    return (
        <div className='container mt-5'>
            <div>
                <h1 className='mb-5'>View Specific Blog</h1>
            </div>
            {loading ? <Loader /> : (
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { mt: 5, width: '100%' },
                    }}
                    autoComplete="off"
                    className='mt-5'
                    onSubmit={handleSubmit}
                >
                    <div className='mt-1'>

                        <div className='row mt-2'>
                            <div className='col-lg-12'>
                                <div className="col-lg-12 mt-2">
                                    <TextField
                                        id="title"
                                        label="Change Blog Title"
                                        variant="filled"
                                        className="w-100"
                                        required
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-12 mt-2">
                                    <TextField
                                        id="titleUrl"
                                        label="Change Blog URL"
                                        variant="filled"
                                        className="w-100"
                                        type="text"
                                        required
                                        name="titleUrl"
                                        value={formData.titleUrl}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-12 mt-2">
                                    <TextField
                                        id='heading'
                                        label="Change Heading of the Blog"
                                        variant="filled"
                                        className="w-100"
                                        type="text"
                                        required
                                        name="heading"
                                        value={formData.heading}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className='row mt-2'>
                                <div className='col-lg-6 mt-2'>
                                    <TextField
                                        id="image"
                                        helperText="Select blog Image"
                                        className="w-100"
                                        type="file"
                                        name="imageURL"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='row mt-2'>
                            <div className='col-lg-12'>
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={{
                                        toolbar: {
                                            items: [
                                                'heading', '|', 'bold', 'italic', 'underline', '|',
                                                'link', 'blockQuote', '|', 'bulletedList', 'numberedList', '|',
                                                'imageUpload', 'mediaEmbed', 'codeBlock', '|', 'undo', 'redo', '|',
                                                'alignment', 'fontFamily', 'fontSize', 'highlight', 'specialCharacters'
                                            ],
                                            shouldNotGroupWhenFull: true
                                        },
                                        language: 'en'
                                    }}
                                    onReady={editor => {
                                        setEditorInstance(editor);

                                        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                                            return {
                                                upload: () => {
                                                    return new Promise((resolve, reject) => {
                                                        loader.file.then(file => {
                                                            handleImageUpload(file)
                                                                .then(response => resolve(response))
                                                                .catch(error => reject(error));
                                                        }).catch(error => reject(error));
                                                    });
                                                },
                                                abort: () => {
                                                    console.log('Image upload aborted');
                                                }
                                            };
                                        };
                                    }}
                                    data={formData.content}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFormData(prevData => ({ ...prevData, content: data }));
                                    }}
                                />
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col-lg-12'>
                                <textarea
                                    rows={4} // Adjust the number of rows as needed
                                    name="description"
                                    className='form-control'
                                    placeholder='Change Blog Description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 mt-2">
                                <TextField
                                    id='tfnHeader'
                                    label="Change Header Telephone Number"
                                    variant="filled"
                                    className="w-100"
                                    type="number"
                                    required
                                    name="tfnHeader"
                                    value={formData.tfnHeader}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-4  mt-2">
                                <TextField
                                    id='tfnPopup'
                                    label="Change Popup Telephone Number"
                                    variant="filled"
                                    className="w-100"
                                    type="number"
                                    required
                                    name="tfnPopup"
                                    value={formData.tfnPopup}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-4 mt-2">
                                <TextField
                                    id='tfnFooter'
                                    label="Change Footer Telephone Number"
                                    variant="filled"
                                    className="w-100"
                                    type="number"
                                    required
                                    name="tfnFooter"
                                    value={formData.tfnFooter}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 mt-2">
                                <TextField
                                    id='categoryName'
                                    label="Change Category Name"
                                    variant="filled"
                                    className="w-100"
                                    type="text"
                                    required
                                    name="categoryName"
                                    value={formData.categoryName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-4 mt-2">
                                <TextField
                                    id='postBy'
                                    label="Change Author Number"
                                    variant="filled"
                                    className="w-100"
                                    type="text"
                                    required
                                    name="postBy"
                                    value={formData.postBy}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-4 mt-2">
                                <TextField
                                    id='extraTags'
                                    label="Change Extra Tags"
                                    variant="filled"
                                    className="w-100"
                                    type="text"
                                    required
                                    name="extraTags"
                                    value={formData.extraTags}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-12 mt-2">
                                <TextField
                                    id='metaDescription'
                                    label="Change Meta Description"
                                    variant="filled"
                                    className="w-100"
                                    type="text"
                                    required
                                    name="metaDescription"
                                    value={formData.metaDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-lg-12 mt-2">
                                <TextField
                                    id='metaKeywords'
                                    label="Change meta Keywords"
                                    variant="filled"
                                    className="w-100"
                                    type="text"
                                    required
                                    name="metaKeywords"
                                    value={formData.metaKeywords}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-12 mt-2">
                                <FormControl fullWidth>
                                    <select
                                        id="status"
                                        value={formData.status}
                                        name="status"
                                        onChange={handleChange}
                                        required
                                        className='form-control'
                                        style={{
                                            height: '51px',
                                            borderBottom: '1px solid black',
                                            backgroundColor: '#ededed'
                                        }}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row mt-2    mb-5">
                            <div className="w-100">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="w-100"
                                >
                                    Save changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            )}
        </div>
    );
};