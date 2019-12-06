import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux" // useSelector grabs state similar to mapStateToProps
import {
  addFavoritePokemon,
  addToTeam,
  removeFavoritePokemon,
  removeFromTeam
} from "../redux/features/pokeTeam/pokeTeamSlice"

/**********BEGIN STYLING********/
import { makeStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Fade from "@material-ui/core/Fade"
import BackIcon from "@material-ui/icons/ArrowBack"
/**********END STYLING********/

import pokemonTypeColors from "../data/pokemonTypeColors"
import capitalizeFirstLetter from "../util/capitalizeFirstLetter"
import TeamButton from "./TeamButton"
import FavoriteButton from "./FavoriteButton"

const useStyles = makeStyles({
  grid: {
    alignItems: "center"
  },
  card: {
    width: "95%", // on small screens only
    maxWidth: "60rem",
    backgroundColor: "rgba(255, 255, 255, 0.96)"
  },
  media: {
    height: 200,
    width: 200
  },
  topButtons: {
    display: "flex",
    justifyContent: "space-between"
  },
  pokemonDescription: {
    color: "rgb(240, 240, 240)",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 0
  },
  backButton: {
    position: "fixed",
    left: "5%",
    top: "5%",
    zIndex: "1100"
  }
})

const PokemonDetails = ({ match, history }) => {
  const classes = useStyles()
  const name = match.params.pokemonName
  const dispatch = useDispatch() // Prevents us from having to use mapDispatch & connect
  // Destructure our state from the Redux store using a hook provided by React-Redux
  const { pokemon } = useSelector(state => state.pokeAPI)
  const { pokeTeam, favoritePokemon } = useSelector(state => state.pokeTeam)
  const pokemonDetails = pokemon.find(p => p.name === name)
  const {
    id,
    abilities,
    height,
    weight,
    sprites,
    stats,
    types,
    capture_rate,
    color,
    habitat,
    description
  } = pokemonDetails

  const matchPokemonColor = {
    position: "fixed",
    zIndex: "-1",
    right: "10%",
    top: "10%",
    width: "300px",
    height: "300px",
    borderRadius: "100%",
    backgroundColor: color.name
  }

  console.log(abilities, color, habitat, description, capture_rate, stats)
  return (
    <div
      id="POKEMONDETAILS"
      align="center"
      style={{ margin: "3rem 0", overflowX: "hidden" }}
    >
      <Link to="/">
        <Fab color="primary" aria-label="add" className={classes.backButton}>
          <BackIcon />
        </Fab>
      </Link>
      {/* These two colored circles are themed to the pokemon to make the content more interesting */}
      <div id="ColoredCircle1" style={matchPokemonColor} />
      <div
        id="ColoredCircle2"
        style={{ ...matchPokemonColor, left: "10%", top: "60%" }}
      />
      <Card className={classes.card}>
        <CardActions className={classes.topButtons}>
          <TeamButton
            onTeam={pokeTeam.includes(name)}
            onClick={() =>
              pokeTeam.includes(name)
                ? dispatch(removeFromTeam(name))
                : dispatch(addToTeam(name))
            }
          />
          <FavoriteButton
            isFavorited={favoritePokemon.includes(name)}
            onClick={() =>
              favoritePokemon.includes(name)
                ? dispatch(removeFavoritePokemon(name))
                : dispatch(addFavoritePokemon(name))
            }
          />
        </CardActions>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={12} md={6}>
            {/******BEGIN POKEMON IMAGE SECTION******/}
            <CardMedia
              image={sprites.front_default}
              title={`pokemon #${id}: ${name}`}
              className={classes.media}
            />
            {/******END POKEMON IMAGE SECTION******/}

            {/******BEGIN POKEMON TYPES SECTION******/}
            <CardContent>
              {types.map(p => {
                let currentTypeColor = pokemonTypeColors[p.type.name]
                return (
                  <Chip
                    style={{
                      backgroundColor: currentTypeColor,
                      color: "white",
                      margin: "0 3px"
                    }}
                    size="medium"
                    label={p.type.name}
                  />
                )
              })}
            </CardContent>
            {/******END POKEMON TYPES SECTION******/}
          </Grid>
          <Grid item xs={12} md={6}>
            {/******BEGIN POKEMON DESCRIPTION SECTION******/}
            <Card className={classes.pokemonDescription} align="left">
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                  {capitalizeFirstLetter(name)}
                </Typography>
                <Typography gutterBottom>
                  <span style={{ marginRight: "1rem" }}>
                    <strong>ID:</strong> {id}
                  </span>
                  <span style={{ marginRight: "1rem" }}>
                    <strong>Height:</strong> {height}{" "}
                  </span>
                  <span>
                    <strong>Weight:</strong> {weight}
                  </span>
                </Typography>
                <Typography gutterBottom>
                  <div>
                    <strong>Abilities:</strong>
                    {abilities.map(ability => (
                      <Typography variant="button" component="p">
                        {ability.ability.name}
                      </Typography>
                    ))}
                  </div>
                </Typography>
                <br />
                <Typography variant="body1" component="p">
                  {description.flavor_text}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="secondary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        {/******BEGIN CARD FOOTER SECTION******/}

        {/******END CARD FOOTER SECTION******/}
      </Card>
    </div>
  )
}

export default PokemonDetails
