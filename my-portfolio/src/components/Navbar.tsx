interface NavbarProps {
    name: string;
}


function Navbar({name}: NavbarProps) {
    return (
        <nav id="navbar" className="translate-y-2">
            <ul className="flex flex-row justify-between items-center m-auto p-4 shadow-md outline outline-black/3 rounded-md">
                <p className="flex flex-row font-bold lowercase">{name}</p>
                <li className="flex flex-row gap-4 text-gray-600">
                    <a href="#about">about</a>
                    <a href="#experience">experience</a>
                    <a href="#projects">projects</a>
                    <a href="#contact" className="text-blue-600">contact</a>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;