const Navbar = () =>{
    return (<>
    {/* <Link> joue le role de <a> dans html  */}
        <Link to='/'>home</Link>
        {/* ex : si on click sur register le path sera /register donc ce va faire
        appel au component <Register> (dans l'exemple de App.js ) */}
        <Link to='/register'>register</Link>
        <Link to='/login'>login</Link>
        </>)

}

export default Navbar
