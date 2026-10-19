'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckIcon, CreditCardIcon, InfoIcon, MailIcon, SearchIcon, StarIcon } from "lucide-react"

export default function UserManagementPage() {
    // 1. Deklarasi state untuk mengontrol buka/tutup form
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <div className="m-6">
            {/* 2. Logika Kondisional: Jika isFormOpen TRUE tampilkan Form, jika FALSE tampilkan Tabel */}
            {isFormOpen ? (
                // TAMPILAN FORM
                <Card className="p-6">
                    <h1 className="text-2xl font-bold">Profile-company</h1>
                    <p>Welcome to your company profile!</p>
                    <div className="grid w-full max-w-lg gap-6 mt-4">
                        <InputGroup>
                            <InputGroupInput placeholder="Search..." />
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupInput type="email" placeholder="Enter your email" />
                            <InputGroupAddon>
                                <MailIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupInput placeholder="Card number" />
                            <InputGroupAddon>
                                <CreditCardIcon />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <CheckIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupInput placeholder="Card number" />
                            <InputGroupAddon align="inline-end">
                                <StarIcon />
                                <InfoIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        
                        {/* Tombol Aksi di Form */}
                        <div className="flex gap-4">
                            <Button onClick={() => setIsFormOpen(false)} variant="outline">
                                Cancel
                            </Button>
                            <Button>Save User</Button>
                        </div>
                    </div>
                </Card>
            ) : (
                // tabel
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">article</h1>
                        {/* Tombol ini sekarang mengubah state jadi TRUE untuk membuka form */}
                        <Button onClick={() => setIsFormOpen(true)}>+ Add User</Button>
                    </div>
                    
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    )
}