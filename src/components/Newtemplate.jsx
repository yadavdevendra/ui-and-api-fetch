
import { Modal, TextContainer } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { Thumbnail } from "@shopify/polaris";
import { useNavigate } from 'react-router-dom';

function Newtemplate() {
    const [rows, setRows] = useState([])
    const [active, setActive] = useState(true);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const activator = true;
    const navigate = useNavigate();

    console.log("arr", rows);
    const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4NzMxOTc2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWY2NDQ4YzQxY2M2MjdhMzBjNmIyMiJ9.o0XvqNpmiAaXQgWC8LgaBrhx6Kjc6rwm0vi-aG-ezZHp3Ph1jcaBqKQq1u9PQSwiCjU6US8xiqMbN_l5JYEwmPOWWQF43Fdt8V2i_dYp2L4mj51rKn9pH7xCloNPAiqCAp7IlfdwXU2NL5cYlb8p4Ve9axRKuPaZ6FpEL49fP8zjlT5gsfR7lr5UD_iKmBH-F-R4ORgQC3vR0CfsW42XXebfTiKf5fh2qBAIrjtSPJyO0jgNxLCTppnT3ruBf3yDL7EcAOFXzUZn_G8NsOSaZp5AvMWIMDkpmBO0VvgkIqSuYOlICki6riprysfwhuwU1XAtpNwI6N571dfUTPhXsw`;

    async function getData() {
        let tempRows = [];
        await fetch(`https://multi-account.sellernext.com/home/public/connector/product/getProduct`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Ced-Source-Id": 500,
                    "Ced-Source-Name": 'shopify',
                    "Ced-Target-Id": 640,
                    "Ced-Target-Name": 'amazon',
                    "target_marketplace":'amazon',
                    "source_marketplace":'shopify',
                    "sourceShopID":500,
                    "targetShopID":640,
                    "container_id":7939240558825,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data, "netemdata");
                data.data.rows.map(elem => {
                    // console.log(elem,'asdfafds')
                    tempRows.push([
                        <Thumbnail source={elem?.['main_image']} />,
                        elem['title'],
                        ...test(elem['items'], elem['source_product_id']),
                        elem['variant_attributes'],
                    ])
                })
                setRows(tempRows);
            });
    }

    useEffect(() => {
        getData()
    }, []);
    return (
        <div style={{ height: '500px' }}>
            <Modal
                activator={activator}
                open={active}
                onClose={() => navigate("/listing")}
                title="Reach more shoppers with Instagram product tags"
            >
                <Modal.Section>
                    <TextContainer>
                        <p>
                            Use Instagram posts to share your products with millions of
                            people. Let shoppers buy from your store without leaving
                            Instagram.
                        </p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </div>
    );
}

export default Newtemplate