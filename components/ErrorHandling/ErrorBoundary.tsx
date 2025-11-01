"use client";

import React, { Component, ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Code,
  useDisclosure,
  IconButton,
  Separator,
} from "@chakra-ui/react";
import { FaRedo, FaHome, FaBug, FaChevronDown, FaChevronUp } from "react-icons/fa";

export interface AppErrorInfo {
  componentStack?: string;
  errorBoundary?: string;
  errorBoundaryStack?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: AppErrorInfo | null;
  errorId: string;
}

class ErrorLogger {
  static log(error: Error, errorInfo: AppErrorInfo | null, errorId: string) {
    console.group(`🚨 Error Boundary Caught Error [${errorId}]`);
    console.error("Error:", error);
    console.error("Error Info:", errorInfo ?? {});
    if (errorInfo?.componentStack) {
      console.error("Component Stack:", errorInfo.componentStack);
    }
    console.groupEnd();
  }
  static generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }
}

const ErrorFallback: React.FC<{
  error: Error;
  errorInfo: AppErrorInfo | null;
  errorId: string;
  onRetry: () => void;
  onGoHome: () => void;
}> = ({ error, errorInfo, errorId, onRetry, onGoHome }) => {
  const { isOpen, onToggle } = useDisclosure();
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="neutral.50" _dark={{ bg: "neutral.900" }} p={4}>
      <Container maxW="2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <VStack spacing={8} textAlign="center">
            <Box fontSize="6xl" color="red.500" _dark={{ color: "red.400" }}>💥</Box>

            <VStack spacing={4}>
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="neutral.800" _dark={{ color: "neutral.100" }}>
                Oops! Something went wrong
              </Text>
              <Text fontSize="lg" color="neutral.600" _dark={{ color: "neutral.400" }} maxW="500px">
                We encountered an unexpected error. Don&apos;t worry, we&apos;re working on a fix.
              </Text>
            </VStack>

            {/* Cartão simples de erro (sem subcomponentes namespaced) */}
            <Box w="100%" maxW="600px" textAlign="left" p={4} borderWidth="1px" borderRadius="lg" bg="red.50" _dark={{ bg: "red.900", borderColor: "red.700" }}>
              <VStack align="stretch" spacing={3}>
                <Text fontWeight="semibold">Error Details</Text>
                <Text fontSize="sm"><strong>Error ID:</strong> {errorId}</Text>
                <Text fontSize="sm"><strong>Message:</strong> {String(error?.message ?? "")}</Text>
                <Text fontSize="sm"><strong>Time:</strong> {new Date().toLocaleString()}</Text>

                {isDevelopment && (
                  <>
                    <Separator />
                    <HStack justify="space-between" align="center">
                      <Text fontSize="sm" fontWeight="semibold">Technical Details (Development Mode)</Text>
                      <IconButton aria-label="Toggle details" size="sm" variant="ghost" onClick={onToggle}>
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </IconButton>
                    </HStack>

                    {isOpen && (
                      <VStack align="stretch" spacing={3}>
                        <Box>
                          <Text fontSize="xs" fontWeight="semibold" mb={2}>Stack Trace:</Text>
                          <Code display="block" whiteSpace="pre-wrap" fontSize="xs" p={3} borderRadius="md" maxH="200px" overflowY="auto">
                            {String(error?.stack ?? "")}
                          </Code>
                        </Box>
                        {errorInfo?.componentStack && (
                          <Box>
                            <Text fontSize="xs" fontWeight="semibold" mb={2}>Component Stack:</Text>
                            <Code display="block" whiteSpace="pre-wrap" fontSize="xs" p={3} borderRadius="md" maxH="150px" overflowY="auto">
                              {String(errorInfo.componentStack)}
                            </Code>
                          </Box>
                        )}
                      </VStack>
                    )}
                  </>
                )}
              </VStack>
            </Box>

            <HStack spacing={4} wrap="wrap" justify="center">
              <Button leftIcon={<FaRedo />} colorScheme="primary" size="lg" onClick={onRetry}>
                Try Again
              </Button>
              <Button leftIcon={<FaHome />} variant="outline" size="lg" onClick={onGoHome}>
                Go Home
              </Button>
              {isDevelopment && (
                <Button leftIcon={<FaBug />} variant="ghost" size="lg" onClick={() => {
                  console.error("Error for debugging:", error);
                  console.error("Error info for debugging:", errorInfo);
                }}>
                  Debug
                </Button>
              )}
            </HStack>

            <Text fontSize="sm" color="neutral.500" _dark={{ color: "neutral.500" }} maxW="400px">
              If this problem persists, please contact support with the error ID above.
            </Text>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export class ErrorBoundary extends Component<
  {
    children: ReactNode;
    fallback?: React.ComponentType<{
      error: Error;
      errorInfo: AppErrorInfo | null;
      errorId: string;
      onRetry: () => void;
      onGoHome: () => void;
    }>;
    onError?: (error: Error, errorInfo: AppErrorInfo | null, errorId: string) => void;
  },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, errorId: "" };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error, errorId: ErrorLogger.generateErrorId() };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    const errorId = this.state.errorId || ErrorLogger.generateErrorId();
    const errorInfo: AppErrorInfo = { componentStack: info?.componentStack };
    this.setState({ errorInfo, errorId });
    ErrorLogger.log(error, errorInfo, errorId);
    this.props.onError?.(error, errorInfo, errorId);
  }

  handleRetry = () => this.setState({ hasError: false, error: null, errorInfo: null, errorId: "" });
  handleGoHome = () => { if (typeof window !== "undefined") window.location.href = "/"; };

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || ErrorFallback;
      return (
        <Fallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
