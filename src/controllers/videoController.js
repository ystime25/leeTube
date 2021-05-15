let videos = [
    {
        title: "Hello",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 1
    },
    {
        title: "Hello2",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 2
    },
    {
        title: "Hello3",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id: 3
    }
];

export const trending = (req, res) => {
    return res.render("home", {pageTitle: "Home", videos});
};
export const watch = (req,res) => {
    const { id } = req.params;
    const video = videos[id-1];
    res.render("watch", {pageTitle:`${video.title}`,video});
};
export const getEdit = (req,res) => {
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit", {pageTitle: `Edit: ${video.title}`, video});
};
export const postEdit = (req,res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
};

