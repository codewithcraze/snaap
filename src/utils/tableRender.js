import '../styles/main.css';
import { Link } from 'react-router-dom';
const TableRender = ({ data }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover table-styling table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Category Name</th>
                        <th>Status</th>
                        <th>Extra Tags</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((country, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{country.title}</td>
                            <td>{country.categoryName}</td>
                            {/* <td>{country.description}</td> */}
                            <td>{country.status === true ? <span className="btn btn-success">Active</span> : <span className='btn btn-danger'>In Active</span>}</td>
                            <td>{country.extraTags}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary">
                                      <Link
                                    to={{
                                        pathname: `${country._id}`,
                                        state: { country }
                                    }}
                                    className='btn btn-primary'
                                >
                                    View
                                </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default TableRender;