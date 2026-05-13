import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import Card from "@mui/material/Card";
import SvgIcon from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { TitleBadge, Wrapper, StatusChip, Overlay } from "./styles";

// =========================================================
interface PageCardProps {
  no?: number;
  title: string;
  imgUrl: string;
  status?: string;
  previewUrl: string;
  disabled?: boolean;
}
// =========================================================

export default function PageCard({
  no,
  title,
  imgUrl,
  status,
  disabled,
  previewUrl
}: PageCardProps) {
  return (
    <Fragment>
      <Wrapper role="article" aria-labelledby={`card-title-${title}`}>
        <Card elevation={1} className="card">
          <Image
            priority
            src={imgUrl}
            width={1175}
            height={1000}
            alt={`${title} demo preview screenshot`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Card>

        {status && <StatusChip aria-label={`Status: ${status}`}>{status}</StatusChip>}

        {!disabled && (
          <Link
            href={previewUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${title} demo in new tab`}>
            <Overlay className="overlay">
              <IconButton aria-label="Preview demo" className="icon-btn">
                <SvgIcon fontSize="small">
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z" />
                    <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                  </g>
                </SvgIcon>
              </IconButton>
            </Overlay>
          </Link>
        )}
      </Wrapper>

      <Typography variant="h6" lineHeight={1} fontWeight={600} textAlign="center">
        {title} {no ? <TitleBadge>({no})</TitleBadge> : null}
      </Typography>
    </Fragment>
  );
}
