import { ReactNode } from "react";
import { RenderOptions, render, screen, waitFor } from "@testing-library/react";
import mockHorsesData from "./dummyData.json";
import { HorsesProvider } from "../../../context/HorsesContext";
import Home from "../../../pages/home";
import { getHorses } from "../../../clients/horsesClient";
import userEvent from "@testing-library/user-event";

jest.mock("../../../clients/horsesClient");
const mockedGetHorses = getHorses as jest.Mock;

const customRender = (
  ui: ReactNode,
  {
    providerProps,
    ...renderOptions
  }: { providerProps?: any } & RenderOptions = {}
) => {
  return render(
    <HorsesProvider {...providerProps}>{ui}</HorsesProvider>,
    renderOptions
  );
};

describe("Home Page", () => {
  const providerProps = {
    selectedHorse: undefined,
    setSelectedHorse: jest.fn(),
  };

  beforeEach(() => {
    mockedGetHorses.mockResolvedValue(mockHorsesData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders horses and clicks a card", async () => {
    customRender(<Home />, { providerProps });

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    const horse1 = screen.getByText(/Horse1/i);
    const horse2 = screen.getByText(/Horse2/i);
    expect(horse1).toBeInTheDocument();
    expect(horse2).toBeInTheDocument();

    await userEvent.click(horse1);

    expect(screen.getByText(/Food1/i)).toBeInTheDocument();
    expect(screen.getByText(/1 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/1 kg/i)).toBeInTheDocument();
  });
});
