import React from "react";
import {
    Navbar,
    Container,
    NavDropdown,
    Nav,
    Button,
    Card,
} from "react-bootstrap";

import { useLocation, useNavigate } from "react-router-dom";

import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { ROUTES } from "../../data/routers";
export const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = localStorage.getItem("auth");

    // if (user === null) {
    //     return <></>;
    // }

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login/");
    };

    const isThisPath = (pathname: string) => {
        return location.pathname.match(`^${pathname}$`);
    };

    return (
        <Navbar bg="white" variant="pills" className="shadow-lg">
            <Container>
                <Navbar.Brand href={ROUTES.main}>
                    <FontAwesomeIcon
                        icon={faCloud}
                        style={{ color: "#174492" }}
                    />{" "}
                    <span
                        className="navbar-brand fw-light text-primary ms-2 text-uppercase"
                        id="logo"
                    >
                        Чистый воздух
                    </span>
                </Navbar.Brand>
                <Nav>
                    {isThisPath("/") ? (
                        <Nav.Link active href="/">
                            Карта
                        </Nav.Link>
                    ) : (
                        <Nav.Link href="/">Карта</Nav.Link>
                    )}
                    {isThisPath("/about") ? (
                        <Nav.Link active href="/about">
                            О сервисе
                        </Nav.Link>
                    ) : (
                        <Nav.Link href={ROUTES.about}>О проекте</Nav.Link>
                    )}
                </Nav>

                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown
                            className="me-6"
                            menuVariant="light"
                            title={
                                <Button
                                    size="sm"
                                    variant="link"
                                    className="text-uppercase link-offset-3"
                                >
                                    <FontAwesomeIcon
                                        icon={faCircleUser}
                                        size="xl"
                                    />{" "}
                                    Пользователь{/* {user} */}
                                </Button>
                            }
                        >
                            <Container>
                                <Card className="text-center">
                                    <Card.Body>
                                        <div>
                                            <FontAwesomeIcon
                                                icon={faCircleUser}
                                                bounce
                                                size="2xl"
                                            />
                                        </div>
                                        <Nav.Link
                                            className="inline"
                                            // href={"mailto:" + user}
                                        >
                                            Пользователь {/* {user} */}
                                        </Nav.Link>
                                    </Card.Body>
                                </Card>
                            </Container>

                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={handleLogout}
                                    >
                                        Выйти
                                    </Button>
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
