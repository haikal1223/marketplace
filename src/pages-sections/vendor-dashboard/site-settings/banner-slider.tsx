import NextImage from "next/image";
import { FormEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
// MUI ICON COMPONENT
import Clear from "@mui/icons-material/Clear";
// GLOBAL CUSTOM COMPONENTS
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/flex-box";
import { fetchSiteSettings, saveSiteSettings } from "../settings-api";

// STYLED COMPONENTS
const UploadBox = styled("div")({
  width: 170,
  height: "auto",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative"
});

const StyledClear = styled(Clear)({
  top: 5,
  right: 5,
  fontSize: 14,
  color: "red",
  cursor: "pointer",
  position: "absolute"
});

interface FileType extends File {
  preview: string;
}

export default function BannerSlider() {
  const [newFiles, setNewFiles] = useState<FileType[]>([]);
  const [existingUrls, setExistingUrls] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSiteSettings()
      .then((s) => setExistingUrls(Array.isArray(s?.bannerSlider?.images) ? s.bannerSlider.images : []))
      .catch(() => setError("Gagal memuat banner slider setting."));
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const uploadedUrls: string[] = [];
      for (const file of newFiles) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("upload failed");
        const data = await res.json();
        uploadedUrls.push(data.url);
      }

      const merged = [...existingUrls, ...uploadedUrls];
      await saveSiteSettings("bannerSlider", { images: merged });
      setExistingUrls(merged);
      setNewFiles([]);
      setSuccess("Banner slider setting tersimpan.");
    } catch {
      setError("Gagal menyimpan banner slider setting.");
    }
  };

  const deleteNewImage = (name: string) => {
    setNewFiles((state) => state.filter((item) => item.name !== name));
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={3}>
        <Grid size={12}>
          <DropZone
            onChange={(files) =>
              setNewFiles(
                files.map((f: File) => Object.assign(f, { preview: URL.createObjectURL(f) })) as FileType[]
              )
            }
          />

          {/* PREVIEW UPLOAD IMAGES */}
          {newFiles.length > 0 ? (
            <FlexBox gap={1} mt={2}>
              {newFiles.map((file, index) => (
                <UploadBox key={index}>
                  <NextImage
                    width={240}
                    height={100}
                    objectFit="cover"
                    src={file.preview}
                    layout="responsive"
                    alt="file"
                  />
                  <StyledClear onClick={() => deleteNewImage(file.name)} />
                </UploadBox>
              ))}
            </FlexBox>
          ) : null}

          {existingUrls.length > 0 && (
            <FlexBox gap={1} mt={2}>
              {existingUrls.map((url, index) => (
                <UploadBox key={`${url}-${index}`}>
                  <NextImage width={240} height={100} objectFit="cover" src={url} layout="responsive" alt="banner" />
                </UploadBox>
              ))}
            </FlexBox>
          )}
        </Grid>

        <Grid size={12}>
          <Button type="submit" color="info" variant="contained">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
