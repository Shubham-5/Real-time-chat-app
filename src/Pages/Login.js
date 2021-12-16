import React, { useState } from 'react';
import {
  Flex,
  HStack,
  Heading,
  Box,
  Divider,
  VStack,
  Button,
  useToast,
  Input,
  InputGroup,
  FormControl,
  CircularProgress,
  FormLabel,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { auth } from '../firebase/Firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = ({ user, setUser }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  //handling login function
  const handleSubmitLogin = async e => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(items => {
        setUser(items);
      })
      .catch(error => {
        toast({
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
      })
      .finally(() => {
        setEmail('');
        setPassword('');
        setIsLoading(false);
      });
  };

  //handling Register function
  const handleSubmitRegister = async e => {
    e.preventDefault();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(user => {
        setUser(user);
        toast({
          description: 'SUCCESS: Created Account',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
      })
      .catch(error => {
        toast({
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
      })
      .finally(() => {
        setEmail('');
        setPassword('');
        setIsLoading(false);
      });
  };

  //handling password visibility && signin text

  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleSignIn = () => setIsSignIn(!isSignIn);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <HStack justify="center" w="full" px={8} mb={8}>
        <Heading size="lg" mt="20px" color="gray">
          {isSignIn ? 'LOGIN' : 'REGISTER'}
        </Heading>
      </HStack>

      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
      <VStack spacing={6} overflowY="auto" w="md">
        <VStack px={8} w="full" mt={6} justifyContent="space-between">
          <Box my={50} textAlign="left">
            {/* ----- Login Form Start here ---- */}

            {isSignIn && (
              <form onSubmit={handleSubmitLogin}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    size="lg"
                    placeholder="enter your email."
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired mb={5} mt={5}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      size="lg"
                      value={password}
                      name="password"
                      placeholder="********"
                      onChange={e => setPassword(e.target.value)}
                    />

                    <InputRightElement mt="4px" width="3rem">
                      <Button
                        opacity="0.7"
                        h="1.5rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  width="full"
                  mt={4}
                  size="lg"
                  variantColor="teal"
                  variant="outline"
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    'Sign IN'
                  )}
                </Button>
              </form>
            )}

            {/* ----- Register Form Start here ---- */}

            {!isSignIn && (
              <form onSubmit={handleSubmitRegister}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    size="lg"
                    placeholder="enter your email."
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired mb={5} mt={5}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      size="lg"
                      value={password}
                      name="password"
                      placeholder="********"
                      onChange={e => setPassword(e.target.value)}
                    />

                    <InputRightElement mt="4px" width="3rem">
                      <Button
                        opacity="0.7"
                        h="1.5rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  width="full"
                  mt={4}
                  size="lg"
                  variantColor="teal"
                  variant="outline"
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    ' Sign UP  '
                  )}

                  <FaSignInAlt />
                </Button>
              </form>
            )}
          </Box>
        </VStack>

        {/* ------- form end up here ----- */}

        <Box px={8} w="full">
          <Divider mt={6} color="gray.100" />
        </Box>
        <HStack px={20} w="full" mt={6} justifyContent="space-between">
          <Text size="sm" fontSize="15px    ">
            {isSignIn ? "Haven't Created Account ?" : 'Already Have Account ?'}
          </Text>
          <Button
            fontWeight="Bold"
            variant="text"
            size="sm"
            color="blue"
            onClick={handleSignIn}
          >
            {!isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </HStack>
      </VStack>

      <Box px={8} w="full">
        <Divider color="gray.100" />
      </Box>
    </Flex>
  );
};

export default Login;
