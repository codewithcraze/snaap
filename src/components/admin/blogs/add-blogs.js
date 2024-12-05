import * as React from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { getAuthHeader, showToast } from '../../../utils/tool';
import { BLOG } from '../../../credentials';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddBlogs = () => {
    const [formData, setFormData] = React.useState({
        title: '',
        titleUrl: '',
        content: '',
        description: '',
        categoryName: '',
        tfnHeader: '',
        tfnPopup: '',
        tfnFooter: '',
        postBy: '',
        extraTags: '',
        heading: '',
        metaDescription: '',
        metaKeywords: '',
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.imageURL);
        try {
            const blogData = {
                title: formData.title,
                titleUrl: formData.titleUrl,
                content: formData.content,
                description: formData.description,
                categoryName: formData.categoryName,
                tfnHeader: formData.tfnHeader,
                tfnPopup: formData.tfnPopup,
                tfnFooter: formData.tfnFooter,
                postBy: formData.postBy,
                extraTags: formData.extraTags,
                heading: formData.heading,
                metaDescription: formData.metaDescription,
                metaKeywords: formData.metaKeywords,
            }
            const response = await axios.post(`${BLOG}`, blogData, { headers: getAuthHeader() });
            if(response.data.status){
                showToast('SUCCESS', 'Blog added successfully.');
                setFormData({
                    title: '',
                    titleUrl: '',
                    content: '',
                    description: '',
                    categoryName: '',
                    tfnHeader: '',
                    tfnPopup: '',
                    tfnFooter: '',
                    postBy: '',
                    extraTags: '',
                    heading: '',
                    metaDescription: '',
                    metaKeywords: '',
                });
            }else{
                showToast('ERROR', 'Failed to add blog.');
            }
        } catch (error) {
            console.error('Error adding blog:', error);
            showToast('ERROR', 'Failed to add blog.');
        }
    };

    return (
        <div className='container mt-1 mb-5' style={{ padding: '20px', background: 'white', borderRadius: '5px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
            <strong><h3> <strong>Add New Blog </strong></h3></strong>
            <Box component="form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className='col-lg-12 mt-2'>
                        <TextField
                            id="title"
                            label="Enter Blog Title"
                            className="w-100"
                            required
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='row mt-2'>
                    <div className='col-lg-12'>
                        <TextField
                            id="titleUrl"
                            label="Enter Blog URL"
                            className="w-100"
                            required
                            type="text"
                            name="titleUrl"
                            value={formData.titleUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <Typography variant="body2" color="textSecondary" mt={2}>
                        <strong>Note:   </strong>

                        To <strong>enter a blog URL</strong>, type or paste a complete URL into the input field above. For SEO optimization and proper indexing.
                    </Typography>

                </div>

                <div className="row">
                    <div className='col-lg-6 mt-2'>
                        <TextField
                            id="extraTags"
                            label="Enter Blog Extra Tags"
                            className="w-100"
                            required
                            type="text"
                            name="extraTags"
                            value={formData.extraTags}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-lg-6 mt-2'>
                        <TextField
                            id="heading"
                            label="Enter Heading of the Blog"
                            className="w-100"
                            required
                            type="text"
                            name="heading"
                            value={formData.heading}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className='col-lg-12'>
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                toolbar: {
                                    items: [
                                        'heading', '|', 'bold', 'italic', '|',
                                        'link', 'blockQuote', '|', 'bulletedList', 'numberedList', '|',
                                        'mediaEmbed', '|', 'undo', 'redo', '|', 'indent', 'outdent', '|', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                                        'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                                        'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                                        'findAndReplace', 'selectAll', 'removeFormat'
                                    ],

                                    shouldNotGroupWhenFull: true
                                },
                                language: 'en'
                            }}
                            data={formData.content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData(prevData => ({ ...prevData, content: data }));
                            }}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className='col-lg-12'>
                        <TextField
                            label="Enter Blog Description"
                            multiline
                            rows={4} // Adjust the number of rows as needed
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col-lg-6 mt-2'>
                        <TextField
                            id="categoryName"
                            select
                            label="Select Blog Category"
                            className="w-100"
                            required
                            name="categoryName"
                            value={formData.categoryName}
                            onChange={handleChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div className='col-lg-6 mt-2'>
                        <TextField
                            id="tfnHeader"
                            label="Enter Header Telephone Number"
                            className="w-100"
                            required
                            type="text"
                            name="tfnHeader"
                            value={formData.tfnHeader}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col-lg-6 mt-2'>
                        <TextField
                            id="tfnPopup"
                            label="Enter Blog PopUp Phone Number"
                            className="w-100"
                            required
                            type="text"
                            name="tfnPopup"
                            value={formData.tfnPopup}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-lg-6 mt-2'>
                        <TextField
                            id="tfnFooter"
                            label="Enter Footer Telephone Number"
                            className="w-100"
                            required
                            type="text"
                            name="tfnFooter"
                            value={formData.tfnFooter}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col-lg-12 mt-2'>
                        <TextField
                            id="postBy"
                            label="Enter Blog Author"
                            className="w-100"
                            required
                            type="text"
                            name="postBy"
                            value={formData.postBy}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col-lg-12 mt-2'>
                        <TextField
                            id="metaDescription"
                            label="Enter Meta Description"
                            className="w-100"
                            required
                            type="text"
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col-lg-12 mt-2'>
                        <TextField
                            id="metaKeywords"
                            label="Enter Meta Keywords"
                            className="w-100"
                            required
                            type="text"
                            name="metaKeywords"
                            value={formData.metaKeywords}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='mt-3'>
                    <Button
                        variant="contained"
                        type="submit"
                        className="w-100"
                    >
                        Submit Data
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default AddBlogs;


const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Travel' },
    { id: 4, name: 'Finance' },
    { id: 5, name: 'Education' },
    { id: 6, name: 'Lifestyle' },
    { id: 7, name: 'Food' },
    { id: 8, name: 'Sports' },
    { id: 9, name: 'Entertainment' },
    { id: 10, name: 'Parenting' },
    { id: 11, name: 'Business' },
    { id: 12, name: 'Fashion' },
    { id: 13, name: 'Photography' },
    { id: 14, name: 'Gaming' },
    { id: 15, name: 'Science' },
    { id: 16, name: 'DIY & Crafts' },
    { id: 17, name: 'Politics' },
    { id: 18, name: 'Environment' },
    { id: 19, name: 'History' },
    { id: 20, name: 'Personal Development' }
];
