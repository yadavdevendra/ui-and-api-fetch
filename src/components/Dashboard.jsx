import { Frame, Navigation } from "@shopify/polaris";
import { Outlet } from "react-router-dom";



function Dashboard() {
    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section
                items={[
                    {label: 'OverView'},
                    { url: '/listing',label: 'Listing'},
                    {label: 'Settings' },
                    {label: 'Products Linking'},
                    {label: 'FAQs'},
                    {label: 'Edit Product'},
                ]}
            />

        </Navigation>
    );
    return (
        <div style={{ height: "500px" }}>

            <Frame
                navigation={navigationMarkup}
            >
                <Outlet />
            </Frame>

        </div>
    );
}

export default Dashboard;
