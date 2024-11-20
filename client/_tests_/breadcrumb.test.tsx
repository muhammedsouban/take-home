import { render, screen, fireEvent } from "@testing-library/react";
import Breadcrumbs from "@/components/breadCrumb";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock

describe("Breadcrumbs Component", () => {
    it("should render the breadcrumbs correctly", () => {
        const mockBack = jest.fn();
        mockUseRouter.mockReturnValue({
            back: mockBack,
        });

        const breadcrumbItems = [
            { label: "Projects", key: "projects", href: "/projects" },
            { label: "Project 1", key: "project1" },
        ];

        render(<Breadcrumbs items={breadcrumbItems} />);

        expect(screen.getByText("Projects")).toBeInTheDocument();
        expect(screen.getByText("Project 1")).toBeInTheDocument();

        const backButton = screen.getByText("Back");
        expect(backButton).toBeInTheDocument();

        fireEvent.click(backButton);
        expect(mockBack).toHaveBeenCalled();
    });


    it("should not render a link if href is not provided", () => {
        const breadcrumbItems = [
            { label: "Home", key: "home", href: "/" },
            { label: "Projects", key: "projects" },
        ];

        render(<Breadcrumbs items={breadcrumbItems} />);
        const projectSpan = screen.getByText("Projects");
        expect(projectSpan).not.toHaveAttribute("href");
    });
});
