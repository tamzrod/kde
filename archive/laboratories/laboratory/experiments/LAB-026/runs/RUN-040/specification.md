# PrismAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.756045Z
**Run ID**: RUN-040
**Seed**: 1700000040

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: lease_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: append_only_array
- Commit Method: index_based

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: leader_change

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_stop

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 340ms
- Election Timeout Base: 370ms
- Election Timeout Range: 192ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:lease_based
- concept:term_epochs
- concept:randomized_timeout
- voting:read_quorum
- vote_granting:grant_if_no_voted
- concept:majority_quorum
- log:hybrid
- log_structure:append_only_array
- commit:index_based
- recovery:hybrid_recovery
- snapshot:leader_change
- dynamic_membership:full_dynamic
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 39
- Election Success Rate: 65.00%
- Messages Sent: 154
- Commits: 16
- Avg Messages/Commit: 9.62
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 63
- Elections Succeeded: 47
- Election Success Rate: 74.60%
- Messages Sent: 311
- Commits: 18
- Avg Messages/Commit: 17.28
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 69
- Elections Succeeded: 65
- Election Success Rate: 94.20%
- Messages Sent: 513
- Commits: 29
- Avg Messages/Commit: 17.69
- Leader Changes: 65
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 54
- Elections Succeeded: 54
- Election Success Rate: 100.00%
- Messages Sent: 722
- Commits: 33
- Avg Messages/Commit: 21.88
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

