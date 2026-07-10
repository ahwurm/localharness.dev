#!/bin/sh
# LocalHarness installer (Linux/macOS) — https://localharness.dev
#
#   curl -fsSL https://localharness.dev/install.sh | sh
#
# Installs uv if missing, then LocalHarness as an isolated uv tool.
# Environment overrides:
#   LOCALHARNESS_VERSION=0.8.1   pin a version (default: latest release)
#   LOCALHARNESS_PKG=<spec>      alternate source — a local path or git+https
#                                URL; used by CI and forks
set -eu

pkg="${LOCALHARNESS_PKG:-localharness}"
if [ -n "${LOCALHARNESS_VERSION:-}" ]; then
  pkg="${pkg}==${LOCALHARNESS_VERSION}"
fi

have() { command -v "$1" >/dev/null 2>&1; }

if ! have uv; then
  echo "installer: uv not found — installing it from astral.sh first"
  if have curl; then
    curl -LsSf https://astral.sh/uv/install.sh | sh
  elif have wget; then
    wget -qO- https://astral.sh/uv/install.sh | sh
  else
    echo "installer: need curl or wget to fetch uv" >&2
    exit 1
  fi
  # uv lands in ~/.local/bin (~/.cargo/bin on older releases); make it
  # visible to the rest of this script
  export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
fi

# --force makes re-running the installer an upgrade. uv picks (or fetches) a
# Python satisfying the package's requires-python (>=3.12) on its own.
uv tool install --force "$pkg"

# Verify the exact binary just installed — not whatever `localharness` PATH
# resolves to; a stale install elsewhere must not pass the check for this one.
bin_dir="$(uv tool dir --bin)"
lh="$bin_dir/localharness"
ver="$("$lh" --version)"  # set -e aborts the installer here if the install is broken
echo "installer: $ver ready ($lh)"

case ":$PATH:" in
  *":$bin_dir:"*) ;;
  *) echo "installer: $bin_dir is not on your PATH — run 'uv tool update-shell', then open a new shell" ;;
esac
if have localharness && [ "$(command -v localharness)" != "$lh" ]; then
  echo "installer: note — $(command -v localharness) shadows the fresh install; check your PATH order"
fi
echo "installer: next — localharness init && localharness start"
