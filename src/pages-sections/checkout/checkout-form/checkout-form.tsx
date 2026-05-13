"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiTextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
// STYLED COMPONENT
import { ButtonWrapper, CardRoot } from "./styles";
// CART HOOK
import useCart from "hooks/useCart";
// CHECKOUT CONTEXT
import { useCheckout } from "../checkout-context";
import type { CartItem } from "contexts/CartContext";
// CUSTOM UTILS
import { currency } from "lib";

// ─── Types ──────────────────────────────────────────────────
interface Region {
  id: number;
  name: string;
}

interface CourierOption {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
  bestOriginDistrictId?: string;
}

interface ShippingDebugInfo {
  apiKeyPresent?: boolean;
  aggregatedCount?: number;
  origins?: Array<{
    originDistrictId: string | number | null;
    reason?: string;
    metaCode?: number | null;
    metaMessage?: string;
  }>;
}

// ─── Validation ─────────────────────────────────────────────
const validationSchema = yup.object().shape({
  fullName: yup.string().required("Nama lengkap wajib diisi"),
  phone: yup.string().required("Nomor telepon wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  provinceId: yup.string().required("Pilih provinsi"),
  cityId: yup.string().required("Pilih kota"),
  districtId: yup.string().required("Pilih kecamatan"),
  address: yup.string().required("Alamat lengkap wajib diisi"),
  notes: yup.string().optional()
});

type FormValues = yup.InferType<typeof validationSchema>;


export default function CheckoutForm() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const { selectedCourierByShopId, setSelectedCourierByShopId } = useCheckout();
  const [error, setError] = useState<string | null>(null);

  // Region data
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [cities, setCities] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<Region[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [provinceLoadError, setProvinceLoadError] = useState<string | null>(null);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  // Region names for display
  const [provinceName, setProvinceName] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");

  // ─── Multi-vendor checkout state ───────────────────────────
  const [shops, setShops] = useState<Array<{ id: string; name: string }>>([]);
  const [cartByShopId, setCartByShopId] = useState<Record<string, CartItem[]>>({});
  const [productOriginByProductId, setProductOriginByProductId] = useState<Record<string, string | null>>(
    {}
  );

  const [couriersByShopId, setCouriersByShopId] = useState<Record<string, CourierOption[]>>({});
  const [loadingCouriersByShopId, setLoadingCouriersByShopId] = useState<Record<string, boolean>>({});
  const [loadingShops, setLoadingShops] = useState(false);
  const [shopErrorsByShopId, setShopErrorsByShopId] = useState<Record<string, string>>({});

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      provinceId: "",
      cityId: "",
      districtId: "",
      address: "",
      notes: ""
    },
    resolver: yupResolver(validationSchema) as any
  });

  const provinceId = watch("provinceId");
  const cityId = watch("cityId");
  const districtId = watch("districtId");

  const buildCourierUnavailableMessage = (shopName: string, debug?: ShippingDebugInfo) => {
    if (!debug) {
      return `Tidak ada kurir tersedia untuk vendor "${shopName}" pada tujuan ini. Coba alamat lain.`;
    }

    if (debug.apiKeyPresent === false) {
      return `Kurir untuk vendor "${shopName}" belum bisa dihitung: konfigurasi API RajaOngkir belum aktif.`;
    }

    const reasons = (debug.origins ?? []).map((o) => o.reason).filter(Boolean);
    if (reasons.includes("meta_not_200")) {
      const firstMeta = (debug.origins ?? []).find((o) => o.reason === "meta_not_200");
      const extra = firstMeta?.metaMessage ? ` (${firstMeta.metaMessage})` : "";
      return `Kurir untuk vendor "${shopName}" tidak tersedia dari API ongkir${extra}.`;
    }
    if (reasons.includes("missing_origin")) {
      return `Gudang asal vendor "${shopName}" belum lengkap, jadi ongkir belum bisa dihitung.`;
    }
    if (reasons.includes("invalid_weight")) {
      return `Berat produk vendor "${shopName}" tidak valid, jadi kurir belum bisa dihitung.`;
    }
    if (reasons.includes("request_failed")) {
      return `Gagal menghubungi layanan ongkir untuk vendor "${shopName}". Coba lagi sebentar.`;
    }

    return `Tidak ada kurir tersedia untuk vendor "${shopName}" pada tujuan ini. Coba alamat lain.`;
  };

  // ─── Load Provinces ───────────────────────────────────────
  useEffect(() => {
    fetch("/api/shipping/provinces")
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data?.error || "Gagal memuat data provinsi");
        return data;
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProvinces(data);
          setProvinceLoadError(null);
        } else {
          setProvinceLoadError("Data provinsi tidak valid.");
        }
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : "Gagal memuat provinsi.";
        setProvinceLoadError(msg);
      })
      .finally(() => setLoadingProvinces(false));
  }, []);

  // ─── Load Cities when Province changes ────────────────────
  useEffect(() => {
    if (!provinceId) {
      setCities([]);
      return;
    }
    setCities([]);
    setDistricts([]);
    setCouriersByShopId({});
    setLoadingCouriersByShopId({});
    setValue("cityId", "");
    setValue("districtId", "");
    setLoadingCities(true);

    const prov = provinces.find((p) => String(p.id) === provinceId);
    setProvinceName(prov?.name ?? "");

    fetch(`/api/shipping/cities/${provinceId}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCities(data);
      })
      .catch(() => { })
      .finally(() => setLoadingCities(false));
  }, [provinceId]);

  // ─── Load Districts when City changes ─────────────────────
  useEffect(() => {
    if (!cityId) {
      setDistricts([]);
      return;
    }
    setDistricts([]);
    setCouriersByShopId({});
    setLoadingCouriersByShopId({});
    setValue("districtId", "");
    setLoadingDistricts(true);

    const c = cities.find((c) => String(c.id) === cityId);
    setCityName(c?.name ?? "");

    fetch(`/api/shipping/districts/${cityId}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDistricts(data);
      })
      .catch(() => { })
      .finally(() => setLoadingDistricts(false));
  }, [cityId]);

  // ─── Resolve shops (vendor) for products in cart ─────────────────────────────
  useEffect(() => {
    let mounted = true;

    if (state.cart.length === 0) {
      setShops([]);
      setCartByShopId({});
      setProductOriginByProductId({});
      setCouriersByShopId({});
      setLoadingCouriersByShopId({});
      setShopErrorsByShopId({});
      setLoadingShops(false);
      return;
    }

    setLoadingShops(true);
    setError(null);
    setShopErrorsByShopId({});

    const productIds = state.cart.map((item) => item.id);

    fetch("/api/products/resolve-shops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds })
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then(
        (
          resolved: Array<{
            productId: string;
            shopId: string;
            shop: { id: string; name: string };
            originDistrictId: string | null;
          }>
        ) => {
          if (!mounted) return;

          const productToShop = new Map(resolved.map((r) => [r.productId, r]));

          const nextCartByShopId: Record<string, CartItem[]> = {};
          const nextShopsMap = new Map<string, { id: string; name: string }>();
          const nextProductOriginByProductId: Record<string, string | null> = {};

          for (const cartItem of state.cart) {
            const resolvedItem = productToShop.get(cartItem.id);
            if (!resolvedItem) {
              setError("Beberapa produk tidak punya vendor/Shop terkait.");
              continue;
            }

            nextProductOriginByProductId[cartItem.id] = resolvedItem.originDistrictId;

            const sid = resolvedItem.shopId;
            nextCartByShopId[sid] = nextCartByShopId[sid] ?? [];
            nextCartByShopId[sid].push(cartItem);

            nextShopsMap.set(sid, { id: resolvedItem.shop.id, name: resolvedItem.shop.name });
          }

          const nextShops = Array.from(nextShopsMap.values());
          setShops(nextShops);
          setCartByShopId(nextCartByShopId);
          setProductOriginByProductId(nextProductOriginByProductId);

          // Reset selected couriers for each shop.
          nextShops.forEach((s) => setSelectedCourierByShopId(s.id, null));
        }
      )
      .catch(() => {
        if (!mounted) return;
        setError("Gagal memuat vendor untuk produk di keranjang.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoadingShops(false);
      });

    return () => {
      mounted = false;
    };
  }, [state.cart, setSelectedCourierByShopId]);

  // ─── Resolve shipping couriers per shop when district selected ────────────
  const calculateShippingForShops = useCallback(
    async (destDistrictId: string) => {
      if (!destDistrictId) return;
      if (!shops.length) return;

      const d = districts.find((d) => String(d.id) === destDistrictId);
      setDistrictName(d?.name ?? "");

      setError(null);
      setShopErrorsByShopId({});
      setCouriersByShopId({});

      // Clear old selections while user is picking a new district.
      shops.forEach((s) => setSelectedCourierByShopId(s.id, null));

      setLoadingCouriersByShopId(Object.fromEntries(shops.map((s) => [s.id, true])));

      try {
        for (const shop of shops) {
          const shopItems = cartByShopId[shop.id] ?? [];
          const originWeights = new Map<string, number>();
          let hasMissingOrigin = false;

          for (const item of shopItems) {
            const originDistrictId = productOriginByProductId[item.id];
            if (!originDistrictId) {
              hasMissingOrigin = true;
              continue;
            }

            const weight = item.qty * (item.weight || 500);
            originWeights.set(originDistrictId, (originWeights.get(originDistrictId) ?? 0) + weight);
          }

          if (hasMissingOrigin || originWeights.size === 0) {
            setShopErrorsByShopId((prev) => ({
              ...prev,
              [shop.id]: `Gudang untuk vendor "${shop.name}" belum diisi atau warehouse produk belum dipilih.`
            }));
            setCouriersByShopId((prev) => ({ ...prev, [shop.id]: [] }));
            continue;
          }

          const originsPayload = Array.from(originWeights.entries()).map(([originDistrictId, weight]) => ({
            originDistrictId,
            weight
          }));

          const res = await fetch("/api/shipping/cost/sum-origin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              destinationDistrictId: destDistrictId,
              origins: originsPayload,
              debug: true
            })
          });

          const data = await res.json().catch(() => null);
          const options = Array.isArray(data)
            ? (data as CourierOption[])
            : Array.isArray(data?.options)
              ? (data.options as CourierOption[])
              : [];
          const debug = (!Array.isArray(data) && data?.debug ? data.debug : undefined) as
            | ShippingDebugInfo
            | undefined;

          if (options.length > 0) {
            setShopErrorsByShopId((prev) => {
              const next = { ...prev };
              delete next[shop.id];
              return next;
            });

            setCouriersByShopId((prev) => ({ ...prev, [shop.id]: options }));
          } else {
            setShopErrorsByShopId((prev) => ({
              ...prev,
              [shop.id]: buildCourierUnavailableMessage(shop.name, debug)
            }));
            setCouriersByShopId((prev) => ({ ...prev, [shop.id]: [] }));
          }
        }
      } catch {
        // silently fail — user can retry
      } finally {
        setLoadingCouriersByShopId(Object.fromEntries(shops.map((s) => [s.id, false])));
      }
    },
    [districts, shops, cartByShopId, productOriginByProductId, setSelectedCourierByShopId]
  );

  useEffect(() => {
    if (districtId) calculateShippingForShops(districtId);
  }, [districtId, calculateShippingForShops]);

  // ─── Submit ───────────────────────────────────────────────
  const onSubmit = handleSubmit(async (values) => {
    setError(null);

    if (state.cart.length === 0) {
      setError("Keranjang kamu kosong.");
      return;
    }

    if (!shops.length) {
      setError("Tidak ada vendor di keranjang kamu.");
      return;
    }

    const missingShop = shops.find((s) => !selectedCourierByShopId[s.id]);
    if (missingShop) {
      setError(`Pilih kurir pengiriman untuk vendor "${missingShop.name}" terlebih dahulu.`);
      return;
    }

    const shippingAddress = [
      values.fullName,
      values.address,
      districtName,
      cityName,
      provinceName
    ]
      .filter(Boolean)
      .join(", ");

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shippingAddress,
        paymentMethod: "COD",
        orders: shops.map((shop) => {
          const courier = selectedCourierByShopId[shop.id]!;

          return {
            shopId: shop.id,
            shippingCost: courier.cost,
            courierName: courier.name,
            courierService: courier.service,
            courierEtd: courier.etd,
            items: (cartByShopId[shop.id] ?? []).map((item) => ({
              name: item.title,
              price: item.price,
              qty: item.qty,
              imgUrl: item.thumbnail,
              productId: item.id
            }))
          };
        })
      })
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal membuat order. Silakan coba lagi.");
      return;
    }

    const data = await res.json();
    dispatch({ type: "CLEAR_CART" });
    const orderIds = (data?.orderIds as string[] | undefined) ?? (data?.id ? [data.id] : []);
    router.push(`/order-confirmation?orderIds=${encodeURIComponent(orderIds.join(","))}`);
  });

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {provinceLoadError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {provinceLoadError}
        </Alert>
      )}

      {/* ── Contact & Address ──────────────────────────────── */}
      <CardRoot elevation={0}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Informasi Penerima
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <MuiTextField
                  {...field}
                  fullWidth
                  label="Nama Lengkap"
                  size="medium"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <MuiTextField
                  {...field}
                  fullWidth
                  label="Nomor Telepon"
                  size="medium"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <MuiTextField
                  {...field}
                  fullWidth
                  label="Email"
                  size="medium"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardRoot>

      {/* ── Shipping Address ───────────────────────────────── */}
      <CardRoot elevation={0}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Alamat Pengiriman
        </Typography>

        <Grid container spacing={2}>
          {/* Province */}
          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="provinceId"
              control={control}
              render={({ field }) => (
                <MuiTextField
                  {...field}
                  select
                  fullWidth
                  label={loadingProvinces ? "Memuat provinsi..." : "Provinsi"}
                  size="medium"
                  error={!!errors.provinceId}
                  helperText={errors.provinceId?.message}
                  disabled={loadingProvinces}
                  slotProps={{
                    input: {
                      endAdornment: loadingProvinces ? <CircularProgress size={20} sx={{ mr: 3 }} /> : null
                    }
                  }}>
                  {loadingProvinces ? (
                    <MenuItem disabled>Memuat provinsi...</MenuItem>
                  ) : (
                    provinces.map((p) => (
                      <MenuItem key={p.id} value={String(p.id)}>
                        {p.name}
                      </MenuItem>
                    ))
                  )}
                </MuiTextField>
              )}
            />
          </Grid>

          {/* City */}
          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="cityId"
              control={control}
              render={({ field }) => (
                <MuiTextField
                  {...field}
                  select
                  fullWidth
                  label={loadingCities ? "Memuat kota..." : "Kota / Kabupaten"}
                  size="medium"
                  error={!!errors.cityId}
                  helperText={errors.cityId?.message}
                  disabled={!provinceId || loadingCities}
                  slotProps={{
                    input: {
                      endAdornment: loadingCities ? <CircularProgress size={20} sx={{ mr: 3 }} /> : null
                    }
                  }}>
                  {loadingCities ? (
                    <MenuItem disabled>Memuat kota...</MenuItem>
                  ) : cities.length === 0 ? (
                    <MenuItem disabled>Pilih provinsi dulu</MenuItem>
                  ) : (
                    cities.map((c) => (
                      <MenuItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </MenuItem>
                    ))
                  )}
                </MuiTextField>
              )}
            />
          </Grid>

          {/* District */}
          <Grid size={{ sm: 6, xs: 12 }}>
            <Controller
              name="districtId"
              control={control}
              render={({ field }) => (
                <MuiTextField
                  {...field}
                  select
                  fullWidth
                  label={loadingDistricts ? "Memuat kecamatan..." : "Kecamatan"}
                  size="medium"
                  error={!!errors.districtId}
                  helperText={errors.districtId?.message}
                  disabled={!cityId || loadingDistricts}
                  slotProps={{
                    input: {
                      endAdornment: loadingDistricts ? <CircularProgress size={20} sx={{ mr: 3 }} /> : null
                    }
                  }}>
                  {loadingDistricts ? (
                    <MenuItem disabled>Memuat kecamatan...</MenuItem>
                  ) : districts.length === 0 ? (
                    <MenuItem disabled>Pilih kota dulu</MenuItem>
                  ) : (
                    districts.map((d) => (
                      <MenuItem key={d.id} value={String(d.id)}>
                        {d.name}
                      </MenuItem>
                    ))
                  )}
                </MuiTextField>
              )}
            />
          </Grid>

          {/* Full address */}
          <Grid size={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <MuiTextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="Alamat Lengkap (Jalan, RT/RW, No Rumah)"
                  size="medium"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <MuiTextField
                  {...field}
                  fullWidth
                  label="Catatan (opsional)"
                  size="medium"
                  placeholder="Contoh: Rumah warna putih, sebelah masjid"
                />
              )}
            />
          </Grid>
        </Grid>
      </CardRoot>

      {/* ── Courier Selection ──────────────────────────────── */}
      <CardRoot elevation={0}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Pilih Kurir Pengiriman
        </Typography>

        {loadingShops && (
          <Typography variant="body2" color="text.secondary">
            Memuat vendor untuk produk di keranjang...
          </Typography>
        )}

        {!districtId && (
          <Typography variant="body2" color="text.secondary">
            Lengkapi alamat pengiriman di atas untuk melihat opsi kurir.
          </Typography>
        )}

        {districtId &&
          shops.map((shop) => {
            const shopCouriers = couriersByShopId[shop.id] ?? [];
            const shopLoading = loadingCouriersByShopId[shop.id] ?? false;
            const selected = selectedCourierByShopId[shop.id] ?? null;

            return (
              <Box key={shop.id} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  Kurir untuk {shop.name}
                </Typography>

                {shopLoading && (
                  <Box display="flex" flexDirection="column" gap={1.5}>
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} variant="rounded" height={56} />
                    ))}
                  </Box>
                )}

                {!shopLoading && shopErrorsByShopId[shop.id] && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {shopErrorsByShopId[shop.id]}
                  </Alert>
                )}

                {!shopLoading && !shopErrorsByShopId[shop.id] && shopCouriers.length > 0 && (
                  <FormControl fullWidth>
                    <RadioGroup
                      value={selected ? `${selected.code}-${selected.service}` : ""}
                      onChange={(e) => {
                        const key = e.target.value;
                        const c = shopCouriers.find((c) => `${c.code}-${c.service}` === key);
                        setSelectedCourierByShopId(
                          shop.id,
                          c
                            ? {
                              code: c.code,
                              name: c.name,
                              service: c.service,
                              cost: c.cost,
                              etd: c.etd,
                              bestOriginDistrictId: c.bestOriginDistrictId
                            }
                            : null
                        );
                      }}>
                      {shopCouriers.map((c) => (
                        <Card
                          key={`${c.code}-${c.service}`}
                          elevation={0}
                          sx={{
                            mb: 1,
                            p: 2,
                            border: "1px solid",
                            borderColor:
                              selected && `${selected.code}-${selected.service}` === `${c.code}-${c.service}`
                                ? "primary.main"
                                : "divider",
                            cursor: "pointer",
                            transition: "border-color 0.2s"
                          }}
                          onClick={() => {
                            setSelectedCourierByShopId(shop.id, {
                              code: c.code,
                              name: c.name,
                              service: c.service,
                              cost: c.cost,
                              etd: c.etd,
                              bestOriginDistrictId: c.bestOriginDistrictId
                            });
                          }}>
                          <FormControlLabel
                            value={`${c.code}-${c.service}`}
                            control={<Radio size="small" />}
                            label={
                              <Box display="flex" justifyContent="space-between" width="100%" ml={1}>
                                <Box>
                                  <Typography variant="body1" fontWeight={600}>
                                    {c.name.toUpperCase()} — {c.service}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {c.description} • Estimasi {c.etd}
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="h6"
                                  fontWeight={700}
                                  color="primary.main"
                                  sx={{ whiteSpace: "nowrap", ml: 2 }}>
                                  {currency(c.cost)}
                                </Typography>
                              </Box>
                            }
                            sx={{ width: "100%", m: 0, alignItems: "flex-start" }}
                          />
                        </Card>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}

                {!shopLoading && !shopErrorsByShopId[shop.id] && shopCouriers.length === 0 && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    Tidak ada kurir tersedia untuk vendor ini pada tujuan ini.
                  </Alert>
                )}
              </Box>
            );
          })}
      </CardRoot>

      {/* ── Payment Method ─────────────────────────────────── */}
      <CardRoot elevation={0}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Metode Pembayaran
        </Typography>

        <Card
          elevation={0}
          sx={{
            p: 2,
            border: "2px solid",
            borderColor: "primary.main",
            bgcolor: "primary.50"
          }}>
          <FormControlLabel
            control={<Radio checked size="small" />}
            label={
              <Box ml={1}>
                <Typography variant="body1" fontWeight={600}>
                  COD (Bayar di Tempat)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bayar langsung ke kurir saat barang sampai
                </Typography>
              </Box>
            }
            sx={{ m: 0, alignItems: "flex-start" }}
          />
        </Card>
      </CardRoot>

      {/* ── Action Buttons ─────────────────────────────────── */}
      <ButtonWrapper>
        <Button
          size="large"
          fullWidth
          href="/cart"
          color="primary"
          variant="outlined"
          LinkComponent={Link}>
          Kembali ke Keranjang
        </Button>

        <Button
          size="large"
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          disabled={
            !districtId ||
            shops.length === 0 ||
            shops.some((s) => Boolean(loadingCouriersByShopId[s.id])) ||
            shops.some((s) => !selectedCourierByShopId[s.id])
          }
          loading={isSubmitting}>
          Place Order
        </Button>
      </ButtonWrapper>
    </form>
  );
}
