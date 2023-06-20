import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const User = (user) => {
    return (
        <tr>
            <td><Link to={`/users/${user.user.id}`}>{user.user.name}</Link></td>
            <td>{user.user.blogs.length}</td>
        </tr>
    )
}

const UsersView = () => {
    const users = useSelector((state) => state.users)

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th><strong>name</strong></th>
                        <th><strong>blogs created</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <User key={user.id} user={user}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default UsersView