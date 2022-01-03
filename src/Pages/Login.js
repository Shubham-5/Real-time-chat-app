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

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth, db } from '../firebase/Firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { updateDoc, doc, setDoc, Timestamp } from 'firebase/firestore';

const Login = ({ user, setUser }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  //handling login function
  const handleSubmitLogin = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //storing user signin info to result
      const result = await signInWithEmailAndPassword(auth, email, password);
      //creating db of user
      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      });
      setUser(result);
      //setting input form empty
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setEmail('');
      setPassword('');
      setIsLoading(false);
    }
  };

  //handling Register function
  const handleSubmitRegister = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });

      setUser(result);
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setEmail('');
      setPassword('');
      setIsLoading(false);
    }
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
      <HStack justify="center" w="full" px={8}>
        <Heading size="lg" mt="20" color="gray">
          {isSignIn ? 'LOGIN' : 'REGISTER'}
        </Heading>
      </HStack>

      <Box px={8} w="full">
        <Divider mt="12" color="gray.100" />
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
                  variant="solid"
                  colorScheme="cyan"
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
                <FormControl isRequired mb={5}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    size="lg"
                    placeholder="enter your name."
                    onChange={e => setName(e.target.value)}
                  />
                </FormControl>
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
                <FormControl isRequired mt={5}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      size="lg"
                      value={password}
                      name="password"
                      placeholder="********"
                      mb={4}
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
                  colorScheme="cyan"
                  variant="solid"
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
                </Button>
              </form>
            )}
          </Box>
        </VStack>

        {/* ------- form end up here ----- */}

        <Box px={8} w="full">
          <Divider color="gray.100" />
        </Box>
        <HStack px={20} w="full" justifyContent="space-between">
          <Text size="sm" fontSize="15px    ">
            {isSignIn ? "Haven't Created Account ?" : 'Already Have Account ?'}
          </Text>
          <Button
            fontWeight="Bold"
            variant="link"
            size="sm"
            _focus={{
              boxShadow: '0 0 0px 0px ',
            }}
            color="blue"
            onClick={handleSignIn}
          >
            {!isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Login;
