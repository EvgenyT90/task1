import React, { useState } from "react";
import { Navigation } from "../../components/navbar";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ChartMy } from "../../components/chart/componenent";

export const Main: React.FC = () => {
    const [loc, setLoc] = useState("Omsk");
    interface ChartData {
        date: any;
        pm10: any;
        pm10Avg: any;
        pm2_5: any;
        pm2_5Avg: any;
        countRow: any;
    }
    const [chartData, setChartData] = useState<ChartData[]>([
        {
            date: new Date(),
            pm10: 0,
            pm10Avg: 0,
            pm2_5: 0,
            pm2_5Avg: 0,
            countRow: 0,
        },
    ]);

    const locChange = (event: any) => {
        setLoc(event.target.value);
        console.log(event.target.value);
    };

    const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de";
    const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${loc}&format=json`;
    const ui = document.getElementById("mC2");

    function createNode(element: any) {
        return document.createElement(element);
    }

    function append(parent: any, el: any) {
        return parent.appendChild(el);
    }

    const getAvgValue = (data: any) => {
        let newArr = [];
        let firstRowValue = data[0][0][0].split("T")[0];
        var tempPm10 = 0;
        var tempPm2_5 = 0;
        var count = 0;

        for (let index = 0; index < data[0][0].length; index++) {
            let oneDate: ChartData = {
                date: new Date(),
                pm10: 0,
                pm10Avg: 0,
                pm2_5: 0,
                pm2_5Avg: 0,
                countRow: 0,
            };

            if (firstRowValue === data[0][0][index].split("T")[0]) {
                if (data[1][0][index] !== null) {
                    tempPm10 = +data[1][0][index];
                }

                if (data[2][0][index] !== null) {
                    tempPm2_5 = +data[2][0][index];
                }

                count++;
            } else {
                oneDate = {
                    date: new Date(firstRowValue),
                    pm10: tempPm10,
                    pm10Avg: tempPm10 / count,
                    pm2_5: tempPm2_5,
                    pm2_5Avg: tempPm2_5 / count,
                    countRow: count,
                };
                newArr.push(oneDate);
                firstRowValue = data[0][0][index].split("T")[0];
                tempPm10 = data[1][0][index];
                tempPm2_5 = data[2][0][index];
                count = 1;
            }

            if (index == data[0][0].length - 1) {
                oneDate = {
                    date: new Date(firstRowValue),
                    pm10: tempPm10,
                    pm10Avg: tempPm10 / count,
                    pm2_5: tempPm2_5,
                    pm2_5Avg: tempPm2_5 / count,
                    countRow: count,
                };
                newArr.push(oneDate);
            }
        }
        return newArr;
    };

    const getWeather = (event: any) => {
        fetch(API_URL_GEO_DATA)
            .then((resp) => resp.json())
            .then(function (data) {
                let pos =
                    data.response.GeoObjectCollection.featureMember[0].GeoObject
                        .Point.pos;
                let coordinates = pos.split(" ");

                if (coordinates) {
                    const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`;
                    fetch(API_OPEN_METEO)
                        .then((resp) => resp.json())
                        .then(function (data) {
                            let arr = [
                                [data.hourly.time],
                                [data.hourly.pm10],
                                [data.hourly.pm2_5],
                            ];
                            // let tableHead = createNode("thead");
                            // let tableBody = createNode("tbody");
                            // let tr = createNode("tr");
                            // tr.innerHTML =
                            //     '<td style="border: 1px solid">Время</td><td style="border: 1px solid">количество частиц pm10</td><td style="border: 1px solid"> количество частиц pm2_5</td>';
                            // append(tableHead, tr);
                            // append(ui, tableHead);
                            // for (
                            //     let index = 0;
                            //     index < arr[0][0].length;
                            //     index++
                            // ) {
                            //     let tr = createNode("tr");
                            //     tr.innerHTML = `<td style='border: 1px solid'>${arr[0][0][index]}</td><td style='border: 1px solid'>${arr[1][0][index]}</td><td style='border: 1px solid'>${arr[2][0][index]}</td>`;
                            //     append(tableBody, tr);
                            // }
                            // append(ui, tableBody);
                            setChartData(getAvgValue(arr));
                        });
                }
            })
            .catch();
    };

    return (
        <main>
            <Navigation></Navigation>
            <Container className="mt-3 myC">
                <InputGroup className="mb-3">
                    <Button
                        variant="outline-secondary"
                        id="button-addon1"
                        onClick={(event) => getWeather(event)}
                    >
                        Button
                    </Button>
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        onChange={(event) => locChange(event)}
                    />
                </InputGroup>
            </Container>
            <Container className="mt-3 myC2">
                <ChartMy props={chartData} />
            </Container>
        </main>
    );
};
