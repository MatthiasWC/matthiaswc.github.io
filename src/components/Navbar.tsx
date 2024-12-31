import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/projects/bloom">Bloom: Roots of Renewal</Link>
            <Link to="/projects/caduceus">Caduceus</Link>
            <Link to="/projects/hackattack">Hack Attack: Code Corruption</Link>
            <Link to="/projects/calaverita">Calaverita</Link>
        </div>
    );
};

export default Navbar;