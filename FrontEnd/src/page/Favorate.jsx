import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Box, Grid, Image, Button, Spinner, CloseButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import url from '../Components/vars';

const Favorite = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/recipes`);
        setFavoriteRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (id) => {
    navigate(`/recipe-data/${id}`);
  };

  const handleRemoveFavorite = (idToRemove) => {
    const newFavoriteRecipes = favoriteRecipes.filter(recipe => recipe._id !== idToRemove);
    setFavoriteRecipes(newFavoriteRecipes);

    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavoriteIds = favoriteIds.filter(id => id !== idToRemove);
    localStorage.setItem('favorites', JSON.stringify(newFavoriteIds));
  };

  const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
  const filteredFavorites = favoriteRecipes.filter(recipe => favoriteIds.includes(recipe._id));

  return (
    <>
      <Navbar />
      <Flex justifyContent="center" minH={"45vh"}>
        <Flex flexDirection="column" width={{ base: '100%', md: '90%', lg: '80%' }}>
          <Box p={5}>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
              {filteredFavorites.length > 0 ? (
                filteredFavorites.map((item, index) => (
                  <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" position="relative">
                    <CloseButton
                      position="absolute"
                      top={2}
                      right={2}
                      size="sm"
                      onClick={() => handleRemoveFavorite(item._id)}
                    />
                    <Image src={item.image} alt={item.title} />
                    <Box p="6">
                      <Box d="flex" alignItems="baseline">
                        <Box fontWeight="semibold" fontSize="lg" mr={2}>
                          {item.title}
                        </Box>
                        <Box color="gray.500" fontWeight="semibold" fontSize="sm">
                          Cook Time: {item.cookTime}
                        </Box>
                      </Box>
                      <Button onClick={() => handleDetailClick(item._id)} mt={2} colorScheme="teal">
                        Details
                      </Button>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  p={6}
                  shadow="md"
                  bg="teal.50"
                  color="teal.500"
                  maxW="md"
                  mx="auto"
                  mt={8}
                  textAlign="center"
                >
                  <h1>No favorite recipes found. Add some to your favorites!</h1>
                  <Box as='a' href='/'>
                    <Button colorScheme="teal" mt={4} >
                      Add Recipes
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
            {loading && (
              <Flex justifyContent="center" alignItems="center" marginTop="20px">
                <Spinner color="teal" size="xl" thickness="4px" />
              </Flex>
            )}
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default Favorite;
