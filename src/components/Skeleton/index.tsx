// React Imports
import React, { ReactNode } from "react";

// Chakra Imports
import { Skeleton } from "@chakra-ui/react";

// Typings[TypeScript]
interface ISkeletonComponentProps {
    children: ReactNode;
    isLoading?: boolean;
}

const SkeletonComponent: React.FC<ISkeletonComponentProps> = ({
    children,
    isLoading = false,
}) => {
    return (
        <Skeleton isLoaded={!isLoading} speed={1} fadeDuration={0.2}>
            {children}
        </Skeleton>
    );
};

export default SkeletonComponent;
