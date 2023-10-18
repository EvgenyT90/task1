import React from "react";
import { Container, Table } from "react-bootstrap";

export const TableData = ({ props }: { props: any }) => {
    let content: JSX.Element;

    content = (
        <div style={{ height: "80vh", overflowY: "auto" }}>
            <Table>
                <thead>
                    <tr>
                        <th>Время</th>
                        <th>Количество частиц pm10</th>
                        <th>Количество частиц pm2_5</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: props[0][0].length }).map(
                        (_, index) => (
                            <tr>
                                <td key={index}>{props[0][0][index]}</td>
                                <td key={index}>{props[1][0][index]}</td>
                                <td key={index}>{props[2][0][index]}</td>
                            </tr>
                        ),
                    )}
                </tbody>
            </Table>
        </div>
    );

    return <Container>{content}</Container>;
};

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
