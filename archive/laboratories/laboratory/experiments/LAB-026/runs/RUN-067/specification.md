# ForgeUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.169545Z
**Run ID**: RUN-067
**Seed**: 1700000067

---

## Architecture

- Architecture: fully_distributed
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: voting_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: hash_chain
- Commit Method: majority_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: periodic

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: byzantine

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 383ms
- Election Timeout Base: 378ms
- Election Timeout Range: 268ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:voting_based
- concept:randomized_timeout
- voting:write_quorum
- vote_granting:grant_to_candidate
- concept:vote_revocations
- log:state_machine
- log_structure:hash_chain
- commit:majority_commit
- recovery:log_catchup
- snapshot:periodic
- dynamic_membership:add_node
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 58
- Elections Succeeded: 44
- Election Success Rate: 75.86%
- Messages Sent: 184
- Commits: 20
- Avg Messages/Commit: 9.20
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 64
- Elections Succeeded: 60
- Election Success Rate: 93.75%
- Messages Sent: 348
- Commits: 21
- Avg Messages/Commit: 16.57
- Leader Changes: 60
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 54
- Elections Succeeded: 39
- Election Success Rate: 72.22%
- Messages Sent: 320
- Commits: 15
- Avg Messages/Commit: 21.33
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 65
- Elections Succeeded: 59
- Election Success Rate: 90.77%
- Messages Sent: 402
- Commits: 16
- Avg Messages/Commit: 25.12
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

