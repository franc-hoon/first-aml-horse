import { ReactNode } from "react";
import {
  RenderOptions,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import mockHorsesData from "./dummyData.json";
import { HorsesProvider } from "../../../context/HorsesContext";
import Home from "../../../pages/home";
import { getHorses, updateHorse } from "../../../clients/horsesClient";

jest.mock("../../../clients/horsesClient");
const mockedGetHorses = getHorses as jest.Mock;
const mockedUpdateHorse = updateHorse as jest.Mock;

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
    mockedUpdateHorse.mockResolvedValue({
      id: "1",
      name: "Horse1",
      profile: {
        favouriteFood: "Sushi",
        physical: {
          height: 123,
          weight: 234,
        },
      },
    });
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

    fireEvent(
      screen.getByText(/Horse1/i),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(screen.getByText(/Food1/i)).toBeInTheDocument();
    expect(screen.getByText(/1 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/1 kg/i)).toBeInTheDocument();
  });

  test("edits a horse", async () => {
    customRender(<Home />, { providerProps });

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    fireEvent(
      screen.getByText(/Horse1/i),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    fireEvent(
      screen.getByText(/Edit/i),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    const foodInput = screen.getByLabelText("food-input");
    const heightInput = screen.getByLabelText("height-input");
    const weightInput = screen.getByLabelText("weight-input");

    fireEvent.change(foodInput, { target: { value: "Sushi" } });
    fireEvent.change(heightInput, { target: { value: "123" } });
    fireEvent.change(weightInput, { target: { value: "234" } });

    fireEvent(
      screen.getByText(/Save/i),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    await waitFor(() => {
      expect(screen.getByText(/Sushi/i)).toBeInTheDocument();
      expect(screen.getByText(/123 cm/i)).toBeInTheDocument();
      expect(screen.getByText(/234 kg/i)).toBeInTheDocument();
    });
  });
});
