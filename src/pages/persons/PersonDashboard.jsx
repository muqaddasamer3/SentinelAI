import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPersons } from "../../services/personService";

export default function PersonDashboard() {

    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPersons();
    }, []);

    async function loadPersons() {
        try {
            const data = await getPersons();
            setPersons(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-3xl">
                Loading Persons...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Persons Database
                </h1>

                <Link
                    to="/"
    className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition"
>
    ← Back to Dashboard
                </Link>

            </div>

            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">ID</th>

                            <th className="p-4 text-left">Person Code</th>

                            <th className="p-4 text-left">First Seen</th>

                            <th className="p-4 text-left">Created</th>

                        </tr>

                    </thead>

                    <tbody>

                        {persons.map(person => (

                            <tr
                                key={person.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    PER-{person.id.slice(0,6).toUpperCase()}
                                </td>

                                <td className="p-4 font-semibold">
                                    {person.person_code}
                                </td>

                                <td className="p-4">
                                    {person.first_seen
                                        ? new Date(person.first_seen).toLocaleString()
                                        : "Not Available"}
                                </td>

                                <td className="p-4">
                                    {new Date(person.created_at).toLocaleString()}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}