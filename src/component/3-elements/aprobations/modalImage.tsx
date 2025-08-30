"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@heroui/react";
import { IconCoins, IconGrid3x3, IconMail, IconPhone, IconTicket } from "@tabler/icons-react";


type ModalImageProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    targetRef: React.RefObject<HTMLElement>;
    moveProps: React.ComponentProps<typeof ModalHeader>;

    data: {
        jugador: string;
        email: string;
        numero: string;
        metodo: string;
        cantidad: number;
        referencia: string;
        total: string;
        imageUrl: string;
    } | null;
};

export const ModalImage: React.FC<ModalImageProps> = ({
    isOpen,
    onOpenChange,
    targetRef,
    moveProps,
    data
}) => {
    if (!data) return null; // si no hay nada seleccionado, no mostrar modal

    return (
        <Modal
            ref={targetRef}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="rounded-2xl shadow-2xl bg-white dark:bg-gray-900"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        {/* Header con estilo */}
                        <ModalHeader
                            {...moveProps}
                            className="flex flex-col gap-1 text-center bg-primary text-white rounded-t-2xl py-4"
                        >
                            <span className="text-lg font-bold tracking-wide">
                                {data.jugador}
                            </span>
                            <span className="text-sm opacity-80">{data.metodo}</span>
                        </ModalHeader>

                        <ModalBody className="px-6 py-4">
                            <div className="flex justify-center">
                              
                                <Image
                                    alt="Comprobante de compra"
                                    src={data.imageUrl}
                                    height={300}
                                    isZoomed
                                />
                            </div>

                            <div className="mt-5 text-sm space-y-3">
                                <p className="flex items-center gap-2">
                                    <IconMail stroke={2} /> <strong>Email:</strong> {data.email}
                                </p>
                                <p className="flex items-center gap-2">
                                    <IconPhone stroke={2} /> <strong>Teléfono:</strong> {data.numero}
                                </p>
                                <p className="flex items-center gap-2">
                                    <IconTicket stroke={2} /> <strong>Cantidad:</strong> {data.cantidad}
                                </p>
                                <p className="flex items-center gap-2">
                                    <IconGrid3x3 stroke={2} /> <strong>Referencia:</strong> {data.referencia}
                                </p>
                                <p className="flex items-center gap-2 text-yellow-600 font-semibold text-base">
                                    <IconCoins stroke={2} /> <strong>Total:</strong> {data.total}
                                </p>
                            </div>
                        </ModalBody>

                        {/* Footer */}
                        <ModalFooter className="w-full flex justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
                            <Button
                                color="danger"
                                variant="light"
                                className="rounded-lg"
                                onPress={onClose}
                            >
                                Cerrar
                            </Button>
                            <Button
                                color="success"
                                className="rounded-lg shadow-md hover:shadow-lg font-bold"
                                onPress={onClose}
                                variant="shadow"
                            >
                                Aprobar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>

        
    );
};
