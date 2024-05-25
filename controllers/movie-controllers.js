import  jwt  from "jsonwebtoken";
import Movie from "../models/Movie.js";


export const addMovie = async (req, res) => {
    let extractToken;
    console.log(req.headers.authorization);
    try {
        extractToken = req.headers.authorization.split(" ")[1];
        console.log("token"+extractToken);
    } catch (error) {
        return res.json({ message: "Authorization header is missing or invalid" });
    }

    if (!extractToken || extractToken.trim() === "") {
        return res.json({ message: "Token Not Found" });
    }

    let adminId;
    try {
        jwt.verify(extractToken, process.env.SECRET_KEY, (err, decrypted) => {
            if (err) {
                return res.json({ message: `${err.message}` });
            } else {
                adminId = decrypted.id;
            }
        });
    } catch (error) {
        return res.json({ message: "Error verifying token" });
    }

    const { title, playTime, description, releaseDate, director, production, actors, posterUrl } = req.body;

    if (!title || !playTime || !description || !releaseDate || !director || !production || !actors || !posterUrl) {
        return res.json({ message: "Invalid Inputs" });
    } 

    let movie;
    try {
        movie = await new Movie({
            title,
            playTime,
            description,
            releaseDate,
            director,
            production,
            actors,
            posterUrl
        });

        movie = movie.save()
    } catch (error) {
        console.error("Error saving movie:", error);
        return res.json({ message: "Unexpected Error" });
    }

    return res.json({ message:"Movie added Successfully",movie });
};


export const getMovieById=async(req,res)=>{
    const id = req.params.id
    let movie;
    try{
        movie = await Movie.findById(id)

    }catch(err){
        return console.log(err);
    }
    if(!movie){
        return res.json({message:"Unexpected Error"})
    }
    return res.json({movie})
}


export const getAllMovies=async(req,res)=>{
    let movies;
    try{
        movies = await Movie.find()
    }catch(err){
        return console.log(err);
    }
    if(!movies){
        return res.json({message:"Unexpected Error"})
    }
    return res.json({movies})
}

export const updateMovie=async(req,res)=>{
    const id = req.params.id;
    
const {title,playTime,description,releaseDate,director,production,actors,posterUrl}=req.body
if(!title && title.trim()==="" && 
!playTime && playTime.trim()==="" &&  
!description && description.trim()==="" && 
 !releaseDate && releaseDate.trim()==="" && 
 !director && director.trim()==="" &&  
 !production && production.trim()==="" && 
  !actors && actors.trim()==="" &&
!posterUrl && posterUrl.trim()==="") {
    return res.json({message:"Invalid Inputs"})
 }

let movie;
try{
    movie = await Movie.findByIdAndUpdate(id,{
        title,
        playTime,
        description,
        releaseDate,
        director,
        production,
        actors,
        posterUrl
    })
}catch(err){
    return console.log(err);
}
if(!movie){
    return res.json({message:"Unexpected Error"})
}
return res.json({movie})

}



export const deleteMovie=async(req,res)=>{
    const id = req.params.id
    let movie;
    try{
        movie= await Movie.findByIdAndDelete(id)
    }catch(err){
      return console.log(err);
    }
    if(!movie){
        return res.json({message:"Unexpected Error"})
    }
    return res.json({message:"Deleted Successfully"})

}
