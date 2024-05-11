import { Box, Heading, Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import axios from 'axios';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';

const RecipeData = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data using Axios
    axios.get("http://localhost:3000/recipes/663c963d4639664d280febed")
      .then(response => {
        setLoading(false);
        if (Array.isArray(response.data)) {
          setRecipes(response.data);
        } else {
          setRecipes([response.data]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); 

  return (
    <Box
      backgroundImage="url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0xxUTagnQrXFEtosKLiwRASSaNVsS8M2YyA&s')" // Replace URL with your image URL
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Heading as="h2" textAlign="center" mb={5} color="red" mt={5}>Recipe Details</Heading>
      <Box fontSize={20}>
        {loading ? (
          <Text textAlign="center" color="white">Loading...</Text>
        ) : (
          recipes.map(recipe => (
            <motion.div 
              key={recipe._id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box 
                className="recipe-card" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden" 
                p={4} 
                mb={4} 
                flex="1 1 400px" 
                display="flex" 
                _hover={{ cursor: "pointer" }}
              >
                <Image 
                  src={recipe.image} 
                  alt={recipe.title} 
                  flex="1" 
                  mr={2} 
                  height={400} 
                  w={200} 
                  marginLeft={20} 
                  borderRadius={50} 
                  _hover={{ borderRadius: "50%", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
                />
                <Box 
                  flex="1" 
                  marginLeft={20} 
                  _hover={{ color: "blue", fontFamily: "monospace" }}
                >
                  <Heading as="h2" size="lg" fontStyle="italic">{recipe.title}</Heading>
                  <Text mt={2}>{recipe.description}</Text>
                  <UnorderedList mt={2}>
                    <Text fontWeight="bold">Ingredients</Text>
                    {recipe.ingredients.map((ingredient, index) => (
                      <ListItem key={index}>{ingredient}</ListItem>
                    ))}
                  </UnorderedList>
                  <UnorderedList mt={2}>
                    <Text fontWeight="bold">Instructions</Text>
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
            </motion.div>
          ))
        )}
      </Box>
    </Box>
  );
}

export default RecipeData;
