import { Box, Heading, Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RecipeData = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios.get("http://localhost:3000/recipes/663c963d4639664d280febed")
      .then(response => {
       
        if (Array.isArray(response.data)) {
          setRecipes(response.data);
        } else {
    
          setRecipes([response.data]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <>
    <Heading as="h2"  textAlign={"center"} mb={5} color={"blue"} mt={5}>Recipe Details</Heading>
    <Box >
      {recipes.map(recipe => (
        <Box key={recipe._id} className="recipe-card" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4} flex="1 1 400px" display="flex">
          <Image src={recipe.image} alt={recipe.title} flex="1" mr={2} height={400} w={200}  marginLeft={20}/>
          <Box flex="1"marginLeft={20} >
            <Heading as="h2" size="lg">{recipe.title}</Heading>
            <Text mt={2}>{recipe.description}</Text>
            <UnorderedList mt={2}>
              <Text fontWeight={"bold"}>Ingredients</Text>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList mt={2}>
              <Text fontWeight={"bold"}>Instructions</Text>
              {recipe.instructions.map((instruction, index) => (
                <ListItem key={index}>{instruction}</ListItem>
              ))}
            </UnorderedList>
            <Text mt={2}>Dietary Restrictions: {recipe.dietaryRestrictions.join(', ')}</Text>
            <Text mt={2}>Healthiness: {recipe.healthiness}</Text>
            <Text mt={2}>Created By: {recipe.createdBy}</Text>
            <Text mt={2}>Created At: {new Date(recipe.createdAt).toLocaleDateString()}</Text>
            <Text mt={2}>Cook Time: {recipe.cookTime}</Text>
          </Box>
        </Box>
      ))}
    </Box>
    </>
  );
}

export default RecipeData;