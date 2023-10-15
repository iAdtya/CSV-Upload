 const home = async (req, res) => { 

    return res.render("home", {
        title: "Home",
    });

}

export default home;