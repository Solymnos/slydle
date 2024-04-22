import { keyframes } from 'styled-components';

export const flipAnimation = keyframes`
0% {
    transform: rotateY(0);
    opacity: 0; /* Rendre la case invisible */
}
40% {
    opacity: 0; /* Garder la case invisible pendant la rotation */
}
50% {
    transform: rotateY(90deg);
    opacity: 1; /* Rendre la case visible après la rotation */
}
100% {
    transform: rotateY(0);
    opacity: 1; /* Garder la case visible */
}
`;
