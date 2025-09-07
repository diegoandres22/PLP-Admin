"use client"

import { AppDispatch } from "@/store";
import { confirmPurchase, declinePurchase } from "@/store/slices/purchaseSlice";
import { Purchase } from "@/types/purchaseProps";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@heroui/react";
import { IconCoins, IconGrid3x3, IconMail, IconPhone, IconTicket } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

type ImageOnly = { image_url: string };

type ModalImageProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    targetRef: React.RefObject<HTMLElement>;
    moveProps?: React.ComponentProps<typeof ModalHeader>;
    data: Purchase | ImageOnly | null;
};

export const ModalImage: React.FC<ModalImageProps> = ({ isOpen, onOpenChange, targetRef, moveProps, data }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();
    const isFullPurchase = (obj: ImageOnly): obj is Purchase => "full_name" in obj;
    
    if (!data) return null;
    return (
        <Modal
            ref={targetRef}
            isOpen={isOpen}
            onOpenChange={onOpenChange} 
            className="rounded-2xl shadow-2xl bg-white dark:bg-gray-900"
            size="lg"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader
                            {...moveProps}
                            className={`flex ${isFullPurchase(data) ? "flex-col gap-1 text-center bg-primary text-white rounded-t-2xl py-4" : "justify-end bg-primary min-h-10 rounded-t-2xl p-3"}`}
                        >
                            {isFullPurchase(data) ? (
                                <>
                                    <span className="text-lg font-bold tracking-wide">{data.full_name}</span>
                                    <span className="text-sm opacity-80">{data.payment_method}</span>
                                </>
                            ):<></> }
                        </ModalHeader>

                        <ModalBody className="px-6 py-4 flex flex-col items-center gap-4">
                            <Image
                                alt={isFullPurchase(data) ? "Comprobante de compra" : "Imagen"}
                                src={data.image_url}
                                height={isFullPurchase(data) ? 500 : undefined}
                                className={`object-contain rounded-lg ${isFullPurchase(data) ? "" : "max-h-[80vh] w-full"}`}
                            />

                            {isFullPurchase(data) && (
                                <div className="mt-5 text-sm space-y-3 flex gap-x-10 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <IconMail stroke={2} /> <strong>Email:</strong> {data.buyer_email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconPhone stroke={2} /> <strong>Teléfono:</strong> {data.phone_number}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconTicket stroke={2} /> <strong>Cantidad:</strong> {data.ticket_numbers.length}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconGrid3x3 stroke={2} /> <strong>Referencia:</strong> {data.payment_reference}
                                    </div>
                                    <div className="flex items-center gap-2 text-yellow-600 font-semibold text-base">
                                        <IconCoins stroke={2} /> <strong>Total pagado:</strong> {data.total_paid} $
                                    </div>
                                </div>
                            )}
                        </ModalBody>

                        {isFullPurchase(data) && (
                            <ModalFooter className="w-full flex justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
                                <Button color="danger" variant="light" className="rounded-lg" onPress={
                                                                                    ()=>{
                                                                                        dispatch(declinePurchase({
                                                                                                purchase_id: data.id,
                                                                                                decline_by: session?.user?.name,
                                                                                            }))
                                                                                        onClose()}}>
                                    Cerrar
                                </Button>
                                <Button color="success" className="rounded-lg shadow-md hover:shadow-lg font-bold" onPress={()=>{
                                    
                                    dispatch(confirmPurchase({
                                                                                    purchase_id: data.id,
                                                                                    confirmed_by: session?.user?.name //+ ' - '+ session?.user?.email
                                                                                }))
                                    onClose()                                            }} variant="shadow">
                                    Aprobar
                                </Button>
                            </ModalFooter>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

// "use client"
// import { Purchase } from "@/types/purchaseProps";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@heroui/react";
// import { IconCoins, IconGrid3x3, IconMail, IconPhone, IconTicket } from "@tabler/icons-react";


// type ModalImageProps = {
//     isOpen: boolean;
//     onOpenChange: (isOpen: boolean) => void;
//     targetRef: React.RefObject<HTMLElement>;
//     moveProps: React.ComponentProps<typeof ModalHeader>;
//     data: Purchase | null;
// };

// export const ModalImage: React.FC<ModalImageProps> = ({
//     isOpen,
//     onOpenChange,
//     targetRef,
//     moveProps,
//     data
// }) => {
//     if (!data) return null; 

//     return (
//         <Modal
//             ref={targetRef}
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             className="rounded-2xl shadow-2xl bg-white dark:bg-gray-900"
//         >
//             <ModalContent>
//                 {(onClose) => (
//                     <>
//                         {/* Header con estilo */}
//                         <ModalHeader
//                             {...moveProps}
//                             className="flex flex-col gap-1 text-center bg-primary text-white rounded-t-2xl py-4"
//                         >
//                             <span className="text-lg font-bold tracking-wide">
//                                 {data.full_name}
//                             </span>
//                             <span className="text-sm opacity-80">{data.payment_method}</span>
//                         </ModalHeader>

//                         <ModalBody className="px-6 py-4">
//                             <div className="flex justify-center">
                              
//                                 <Image
//                                     alt="Comprobante de compra"
//                                     src={data.image_url}
//                                     height={550}
//                                 />
//                             </div>

//                             <div className="mt-5 text-sm space-y-3 flex gap-x-10 flex-wrap ">
//                                 <div className="flex items-center gap-2">
//                                     <IconMail stroke={2} /> <strong>Email:</strong> {data.buyer_email}
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <IconPhone stroke={2} /> <strong>Teléfono:</strong> {data.phone_number}
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <IconTicket stroke={2} /> <strong>Cantidad:</strong> {data.ticket_numbers.length}
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <IconGrid3x3 stroke={2} /> <strong>Referencia:</strong> {data.payment_reference}
//                                 </div>
//                                 <div className="flex items-center gap-2 text-yellow-600 font-semibold text-base">
//                                     <IconCoins stroke={2} /> <strong>Total pagado:</strong> {data.total_paid} $
//                                 </div>
//                             </div>
//                         </ModalBody>

//                         {/* Footer */}
//                         <ModalFooter className="w-full flex justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
//                             <Button
//                                 color="danger"
//                                 variant="light"
//                                 className="rounded-lg"
//                                 onPress={onClose}
//                             >
//                                 Cerrar
//                             </Button>
//                             <Button
//                                 color="success"
//                                 className="rounded-lg shadow-md hover:shadow-lg font-bold"
//                                 onPress={onClose}
//                                 variant="shadow"
//                             >
//                                 Aprobar
//                             </Button>
//                         </ModalFooter>
//                     </>
//                 )}
//             </ModalContent>
//         </Modal>

        
//     );
// };
