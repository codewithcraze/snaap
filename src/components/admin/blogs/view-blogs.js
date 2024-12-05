import { useEffect, useState } from "react";
import axios from 'axios';
import { Loader, showToast } from "../../../utils/tool";
import TableRender from '../../../utils/tableRender.js';
import { GETBLOG } from "../../../credentials/index.js";

const ViewBlogs = () => {
    // State to manage agents data and loading state
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlog = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${GETBLOG}`);
            setBlogs(response.data.blogs || []);
        } catch (error) {
            console.error('Error fetching agents:', error);
            showToast("ERROR", "Failed to fetch agents.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="container mt-5">
            <h5><b>Blogs on the platform</b></h5>
            {loading ? <Loader /> : <TableRender data={blogs}/>}
        </div>
    );
};

export default ViewBlogs;
