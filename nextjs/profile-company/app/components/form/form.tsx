import {
    CheckIcon,
    CreditCardIcon,
    InfoIcon,
    MailIcon,
    SearchIcon,
    StarIcon,
} from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react";


export default function FormPage() {
    const [isLoginOpen, setIsFormOpen] = useState(false);
    return (
       <Card className="p-6">
                    <h1 className="text-2xl font-bold">jurusan</h1>
                    <p>Welcome to your jurusan</p>
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
    )
}