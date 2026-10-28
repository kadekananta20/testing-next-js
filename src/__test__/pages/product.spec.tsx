import ProductPage from "@/pages/product";
import {render, screen} from "@testing-library/react";

jest.mock("next/router", () => {
    return {
        useRouter: () => ({
            route: "/product",
            pathname: "",
            query: "",
            asPath: "",
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(() => null),
            },
            beforePopState: jest.fn(() => null),
            isReady: true,
        }),
    };
});

describe("Product Page", () => {
    it("render product page", () => {
        const page = render(<ProductPage />);
        expect(page).toMatchSnapshot();
    });
    
});
