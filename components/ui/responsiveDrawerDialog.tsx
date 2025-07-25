"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { DeviceSize } from "@/shared/enums";

interface IProps {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function ResponsiveDrawerDialog({ open, onOpenChange, title, description, children }: IProps) {
    const isDesktop = useMediaQuery(DeviceSize.DESKTOP);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px] lg:max-w-170">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>

                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>

                <div className="no-scrollbar overflow-y-auto py-4">{children}</div>

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>{/* <Button variant="outline">انصراف</Button> */}</DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
