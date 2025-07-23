import { useState } from "react";
import { Input } from "@/components/ui/input";
import InputError from "./InputError";

export function ImageUpload({ imagePath, onChangeImage, errorMessage }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            if (onChangeImage) onChangeImage(file, reader.result);
        };
        reader.readAsDataURL(file);
    };

    const getImageSrc = () => {
        if (previewUrl) return previewUrl;

        const fullPath = imagePath?.startsWith('http')
            ? imagePath
            : `${window.location.origin}/${imagePath}`;

        if (imagePath && fullPath !== `${window.location.origin}/storage/`)
            return fullPath;

        return `${window.location.origin}/assets/images/default_image_profile.png`;
    };

    return (
        <div className="space-y-2">
            <Input type="file" accept="image/*" onChange={handleChange} className="dark:bg-[#040529]" />
            {errorMessage && <InputError message={errorMessage} className="mt-2 text-red-600" />}
            <img
                src={getImageSrc()}
                alt="Preview"
                className="md:w-60 md:h-auto w-full h-auto object-cover rounded-lg border relative group"
            />
        </div>
    );
}
