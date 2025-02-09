import { useNavigate, useParams } from "react-router-dom"
import Card from "../components/Card";
import { getApi } from "../api";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
const aboutProduct = {
    "air conditioner": {
        heading: "Air Conditioner",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore saepe hic ullam quia eveniet? Laborum consequuntur consequatur consectetur amet. Tempora soluta laborum sunt voluptates quia quisquam cupiditate temporibus minima, voluptatum numquam sequi ut? Expedita unde, placeat maiores nam tempore quisquam suscipit consectetur eius explicabo, cupiditate officiis, illum quos."
    },
    mobile: {
        heading: "Mobile",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur corporis nam blanditiis, officia omnis sint vitae earum? Minus sed nam aliquid quisquam, nihil tenetur facilis aliquam sunt dolor mollitia voluptatibus ut eum eaque, quod repellat blanditiis similique, id rem impedit. Exercitationem ea quis cum temporibus!"
    },
    "audio video": {
        heading: "Audio Video",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam est eum quis nostrum beatae quia doloremque fugit sit voluptas placeat. Ullam consequatur ipsam odit culpa incidunt. Consequatur odio accusamus neque, eaque sint repellendus animi eum unde blanditiis expedita sapiente repudiandae magnam eos modi, impedit enim voluptatem delectus possimus qui illo?"
    },
    "kitchen appliances": {
        heading: "Kitchen Appliances",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt accusantium magnam, placeat ad necessitatibus quam autem. Corrupti ullam quos dolores ratione voluptates dicta in porro alias quod, maiores reiciendis nesciunt impedit deleniti placeat non dolor debitis velit quis. Fugiat reprehenderit saepe magni! At dolor autem, assumenda sint voluptas, repudiandae voluptate expedita quibusdam vel, laudantium obcaecati. Optio, cumque provident! Eveniet, dolor."
    },
    refrigerator: {
        heading: "Refrigerator",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam optio, dicta temporibus ea nam libero corrupti voluptatem iure sequi ipsum sed nobis autem id nisi quo iste sunt ex fugit. Tenetur nulla optio ex, reprehenderit nobis nisi ipsam nemo, non animi illo dolorum corporis est esse unde, dolor sint cupiditate voluptatum? Temporibus laudantium alias inventore."
    },
    laptop: {
        heading: "Laptop",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique officiis recusandae natus accusamus laboriosam beatae animi tenetur, placeat, quisquam quidem reprehenderit perferendis earum aliquam nemo corporis dolor deserunt quasi eligendi? Dolores temporibus adipisci neque exercitationem sunt enim, assumenda fuga commodi dolore et dolor nemo nisi eos sed minus iusto repellat, vitae suscipit culpa sequi perferendis architecto delectus. Obcaecati velit ipsam adipisci illo veniam exercitationem dicta praesentium, quibusdam, sequi illum optio."
    }
}
function ListingPage() {
    const {category} = useParams();
    const [allProduct, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCategoryProduct()
    }, [category])
    const getCategoryProduct = async () => {
        try {
            setLoading(true);
            const res = await getApi(`/product?category=${category}`);
            console.log(res);
            setLoading(false);
            setAllProduct(res?.data?.data);
        } catch(err) {
            setLoading(false);
            console.log(err);
        }
    }

    if(!aboutProduct?.[category]?.["heading"])
        return <h1>404 Not Found</h1>

    return (
        <Card classes=" p-4  m-auto  min-[651px]:w-[80%]">
            <h1 className="text-blue-600 text-4xl md:font-bold">
                {aboutProduct?.[category]?.["heading"]}
            </h1>
            <p className="mt-5">
                {aboutProduct?.[category]?.["description"]}
            </p>
      
            <div className="mt-3 flex flex-wrap">
                {allProduct?.map((value) => (
                    <div className="flex flex-col gap-2 bg-gray-200 p-2 border-2 border-solid rounded-lg shadow-[4px_4px_3px_#bbb]" 
                        key={`listing${value?._id}`}
                        onClick={() => navigate(`/product/${value?.category}/${value?._id}`)}
                        >
                        <img src={value?.image} alt="" 
                            className="w-[200px] h-[200px] object-contain border-none rounded-t-lg"
                        />
                        <span>{value?.ratings}</span>
                        <span className="font-medium">{value?.name}</span>
                        <span>{value?.price} INR</span>
                    </div>
                ))
                }
            </div>
        </Card>
    )
}
export { ListingPage }