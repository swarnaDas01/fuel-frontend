import { useDeleteNotificationMutation, useGetAllNotificationQuery } from "@/Store/slices/fuelStation";
import { toast } from "react-toastify";
import moment from 'moment';


export default function AdminNotify() {
    const { data, isLoading, isError } = useGetAllNotificationQuery();
    const [deleteNotificationMutation] = useDeleteNotificationMutation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data...</div>;
    }
    const comments = data || [];

    const handleDelete = async (id) => {
        try {
            // Perform the mutation to delete the stock item by ID
            const res = await deleteNotificationMutation(id);
            //show success message
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getTimeDifference = (timestamp) => {
        return moment(timestamp).fromNow();
    };



    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mx-20 my-4">Notifications</h1>
            <ul role="list" className="divide-y divide-gray-300 m-1 p-2 w-3/3 mx-20">
                <p className="text-end py-2"><a href="" className="text-gray-500">Read All</a></p>
                {comments.map((comment) => (
                    <li key={comment?._id} className={`flex gap-x-4 px-3 py-5 ${comment?.isRead === false ? 'bg-green-100' : 'bg-gray-100'} rounded-md`}>
                        <div className="flex-auto">
                            <div className="flex items-baseline justify-between gap-x-4">
                                <span className="text-sm font-semibold leading-6 text-gray-600">{comment.message}</span>
                                <div className="flex items-center">
                                    <p className="flex-none text-xs text-gray-600 mr-4">
                                        <time dateTime={comment?.dateTime}>{getTimeDifference(comment?.createdAt)}</time>
                                    </p>
                                    <button
                                        onClick={() => handleDelete(comment._id)}
                                        className="text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">{comment?.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
