import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    UserCheck,
    UserX,
    Shield,
} from "lucide-react";

import { getUsers } from "../../services/userService";

export default function UserDashboard() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-3xl">
                Loading Users...
            </div>
        );
    }

    const total = users.length;

    const activeUsers = users.filter(
        u => u.is_active
    ).length;

    const inactiveUsers = total - activeUsers;

    const admins = users.filter(
        u => u.role.toLowerCase().includes("admin")
    ).length;

    return (

        <div className="min-h-screen bg-[#EEF3FA]">

            <section className="bg-gradient-to-r from-[#05171F] to-black rounded-b-[40px] px-10 py-12 text-white">

                <div className="flex justify-between">

                    <div>

                        <div className="inline-flex px-4 py-2 rounded-full border border-white/30">
                            User Management
                        </div>

                        <h1 className="mt-6 text-6xl font-bold">
                            Users Dashboard
                        </h1>

                        <p className="mt-4 text-xl opacity-80">
                            Manage administrators, operators and security staff.
                        </p>

                    </div>

                    <Link
                        to="/"
                        className="h-fit px-6 py-3 rounded-xl bg-white text-black font-semibold"
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            </section>

            <div className="grid grid-cols-4 gap-6 px-10 -mt-10">

                <Card
                    title="Total Users"
                    value={total}
                    icon={<Users />}
                />

                <Card
                    title="Active"
                    value={activeUsers}
                    icon={<UserCheck />}
                />

                <Card
                    title="Inactive"
                    value={inactiveUsers}
                    icon={<UserX />}
                />

                <Card
                    title="Admins"
                    value={admins}
                    icon={<Shield />}
                />

            </div>

            <div className="px-10 mt-10">

                <div className="bg-white rounded-3xl shadow p-8">

                    <h2 className="text-3xl font-bold">
                        Registered Users
                    </h2>

                    <table className="w-full mt-8">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-4">Name</th>
                                <th className="text-left">Email</th>
                                <th className="text-left">Role</th>
                                <th className="text-left">Status</th>
                                <th className="text-left">Created</th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map(user => (

                                <tr
                                    key={user.id}
                                    className="border-b h-16"
                                >

                                    <td>{user.full_name}</td>

                                    <td>{user.email}</td>

                                    <td>

                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                            {user.role}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                user.is_active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {user.is_active ? "Active" : "Inactive"}
                                        </span>

                                    </td>

                                    <td>

                                        {new Date(user.created_at).toLocaleString()}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

function Card({ title, value, icon }) {

    return (

        <div className="bg-white rounded-3xl shadow p-8">

            <div className="flex justify-between">

                <div>

                    <p className="text-gray-500">{title}</p>

                    <h2 className="text-5xl font-bold mt-4">
                        {value}
                    </h2>

                </div>

                <div className="text-blue-600">
                    {icon}
                </div>

            </div>

        </div>

    );

}